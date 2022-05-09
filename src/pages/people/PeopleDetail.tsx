import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTools } from '../../shared/components';
import { BaseLayoutOfPages } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/api/people/PeopleService';

export const PeopleDetail: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

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
  if (confirm(`Are you sure you want to delete ${name}?`)) {
    PeopleService.deleteById(id)
    .then((result) => {
      if (result instanceof Error) {
        toast.error(result.message, {
          duration: 5000,
          position: 'top-right',
        });
        return;
      }
      toast.error('Deleted', {
        duration: 5000,
        position: 'top-right',
      });
      navigate('/people');
    });
  }
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
