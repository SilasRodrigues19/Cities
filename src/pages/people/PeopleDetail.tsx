import { useNavigate, useParams } from 'react-router-dom';
import { DetailTools } from '../../shared/components';
import { BaseLayoutOfPages } from '../../shared/layouts';

export const PeopleDetail: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('Save');
  };

  const handleDelete = () => {
    console.log('Delete');
  };

  return (
    <BaseLayoutOfPages
      title="People Detail"
      toolbar={
        <DetailTools
          newTextButton="New"
          showSaveCloseButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}
          onClickSave={handleSave}
          onClickSaveClose={handleSave}
          onClickDelete={handleDelete}
          onClickNew={() => navigate('/people/details/new')}
          onClickBack={() => navigate('/people')}
        />
      }
    >
      <p>Teste {id}</p>
    </BaseLayoutOfPages>
  );
};
