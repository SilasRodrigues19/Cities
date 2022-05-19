import { CircularProgress, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTools } from '../../shared/components';
import { BaseLayoutOfPages } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/api/people/PeopleService';

import Swal from 'sweetalert2'
import { useTheme } from '@mui/material';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FTextField } from '../../shared/forms';


interface IFormData {
  email: string;
  cityId: number;
  fullName: string;
}

export const PeopleDetail: React.FC = () => {
  
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if(id !== 'new') {
      
      setIsLoading(true);

      PeopleService.getById(Number(id))
      .then((result) => {
        setIsLoading(false);

        if(result instanceof Error) {
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
    }
  }, [id])

  const handleSave = (data: IFormData) => {
    setIsLoading(true);

    if (id === 'new') {
      PeopleService
      .create(data)
      .then((result) => {
        setIsLoading(false);
        if(result instanceof Error) {
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
      .updateById(Number(id), { id: Number(id), ...data})
      .then((result) => {
        setIsLoading(false);
        
        if(result instanceof Error) {
          toast.error(result.message, {
            duration: 5000,
            position: 'top-right',
          });
          return;
        }
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
    <BaseLayoutOfPages
      title={id === 'new' ? 'New Person' : 'Editing ' + name}
      toolbar={
        <DetailTools
          newTextButton="New"
          showSaveCloseButton
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

      <Form ref={formRef} onSubmit={handleSave}>
        <FTextField placeholder="Fullname" name="fullName" />
        <FTextField placeholder="Email" name="email" />
        <FTextField placeholder="City ID" name="cityId" />
      </Form>


      {isLoading && (
        <CircularProgress variant="indeterminate" />
      )}
      <p>Teste {id}</p>
    </BaseLayoutOfPages>
  );
};
