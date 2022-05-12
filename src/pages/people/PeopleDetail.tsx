import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTools } from '../../shared/components';
import { BaseLayoutOfPages } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/api/people/PeopleService';

import Swal from 'sweetalert2'
import { useTheme } from '@mui/material';

export const PeopleDetail: React.FC = () => {
  
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
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
        console.log(result);
      })
    }
  }, [id])

  const handleSave = () => {
    console.log('Save');
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: `Are you sure you want to delete ${name}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7b1fa2',
      cancelButtonColor: '#f1556c',
      confirmButtonText: 'Yes, delete it!',
      iconColor: '#7b1fa2',
      background: theme.palette.mode == 'dark' ? '#cacaca' : '#1e1e1e',
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
          onClickSave={handleSave}
          onClickSaveClose={handleSave}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/people/details/new')}
          onClickBack={() => navigate('/people')}
        />
      }
    >
      {isLoading && (
        <CircularProgress variant="indeterminate" />
      )}
      <p>Teste {id}</p>
    </BaseLayoutOfPages>
  );
};
