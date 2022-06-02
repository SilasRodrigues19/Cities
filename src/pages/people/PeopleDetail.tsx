import { Box, Grid, LinearProgress, Paper, Theme, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTools } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/api/people/PeopleService';

import Swal from 'sweetalert2'
import { useTheme } from '@mui/material';
import { FTextField, useFForm, FForm, IFFormErrors } from '../../shared/forms';
import * as val from 'yup';
import { CityAutoComplete } from './components/CityAutoComplete';


interface IFormData {
  email: string;
  cityId: number;
  fullName: string;
}

const formValidationSchema: val.SchemaOf<IFormData> = val.object().shape({
  cityId: val.number().required('City is a required field'),
  email: val.string().required('Mail is a required field').email('Email must be a valid email'),
  fullName: val.string().required('Name is a required field').min(3, 'Name must be at least 3 characters').matches(/^[a-z\u00C0-\u00FF-\~`´^']+/i, "Only alphabets are allowed for this field "),
});

export const PeopleDetail: React.FC = () => {

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
  const theme = useTheme();

  const { formRef } = useFForm();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');

  const defaultValue = '...';

  useEffect(() => {
    if (id !== 'new') {

      setIsLoading(true);

      PeopleService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            toast.remove();
            toast.error(result.message, {
              duration: 5000,
              position: 'top-right',
            });
            navigate('/people');
            return;
          }
          setName(result.fullName);
          formRef.current?.setData(result);
        })
      return;
    }
    formRef.current?.setData({
      fullName: '',
      email: '',
      cityId: undefined,
    });
  }, [id])

  const handleSave = (data: IFormData) => {

    formValidationSchema.
      validate(data, { abortEarly: false })
      .then((validateData) => {

        setIsLoading(true);

        if (id === 'new') {
          PeopleService
            .create(validateData)
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                toast.error(result.message, {
                  duration: 5000,
                  position: 'top-right',
                });
                return;
              }
              navigate(`/people/details/${result}`);
            });
          return;
        }
        PeopleService
          .updateById(Number(id), { id: Number(id), ...validateData })
          .then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              toast.error(result.message, {
                duration: 5000,
                position: 'top-right',
              });
              return;
            }
            toast.remove();
            toast.success('Success', {
              duration: 5000,
              position: 'top-right',
            });
          });
      })
      .catch((errors: val.ValidationError) => {
        const validationErrors: IFFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);

      });

  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: `Are you sure you want to delete ${name}?`,
      color: theme.palette.mode == 'light' ? '#979797' : '#3B3B3B',
      html: "You <strong>won't be able</strong> to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7b1fa2',
      cancelButtonColor: '#f1556c',
      confirmButtonText: 'Yes, delete it!',
      iconColor: '#7b1fa2',
      background: theme.palette.mode == 'dark' ? '#cacaca' : '#1e1e1e',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
        icon: 'animate__animated animate__swing animate__delay-1s'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        PeopleService.deleteById(id)
          .then((result) => {
            if (result instanceof Error) {
              toast.error(result.message, {
                duration: 5000,
                position: 'top-right',
              });
              return;
            }
            Swal.fire({
              title: 'Deleted!',
              text: `${name} has been deleted.`,
              icon: 'success',
              background: theme.palette.mode == 'dark' ? '#cacaca' : '#1e1e1e',
              iconColor: '#7b1fa2',
              confirmButtonColor: '#7b1fa2',
              showClass: {
                popup: 'animate__animated animate__backInUp',
                icon: 'animate__animated animate__rollIn animate__delay-1s'
              },
              hideClass: {
                popup: 'animate__animated animate__backOutUp'
              }
            })
          });
        setTimeout(() => {
          navigate('/people');
        }, 3000);
      }
    })
  };

  return (
    <BaseLayout
      title={id === 'new' ? 'New Person' : `Editing to ${isNaN(parseFloat(name)) ? name : defaultValue}`}
      toolbar={
        <DetailTools
          newTextButton="New"
          showSaveCloseButton={false}
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}
          onClickSave={() => formRef.current?.submitForm()}
          onClickSaveClose={() => formRef.current?.submitForm()}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/people/details/new')}
          onClickBack={() => navigate('/people')}
        />
      }
    >

      <Toaster
        toastOptions={{
          style: {
            width: smDown ? '70%' : '100%',
            background: 'transparent',
            border: '1px solid',
            borderColor: theme.palette.mode == 'light' ? 'rgba(1, 1, 1, .2)' : 'rgba(255, 255, 255, .2)',
            color: theme.palette.mode == 'light' ? '#1e1e1e' : '#fff',
            padding: smDown ? '10px 20px' : '10px 50px',
            margin: smDown ? '0 auto' : '',
            userSelect: 'none',
          },
        }}
      />

      <FForm ref={formRef} onSubmit={handleSave}>

        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">
                Form data
              </Typography>
            </Grid>

            <Grid container item direction="row" spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <FTextField
                  sx={{
                    '&:-webkit-autofill': {
                      '-webkit-box-shadow': '0 0 0 100px #111827 inset',
                    }
                  }}
                  className="FTextFieldTruncated"
                  autoFocus={true}
                  fullWidth
                  label="Fullname"
                  placeholder="Enter your name"
                  name="fullName"
                  onChange={e => setName(e.target.value)}
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <FTextField
                  className="FTextFieldTruncated"
                  fullWidth
                  label="Email"
                  placeholder="Enter with your email"
                  name="email"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <CityAutoComplete isExternalLoading={isLoading} />
              </Grid>
            </Grid>

          </Grid>
        </Box>
      </FForm>
    </BaseLayout >
  );
};
