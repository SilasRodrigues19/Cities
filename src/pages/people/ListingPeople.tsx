import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListingTools } from '../../shared/components';
import { BaseLayoutOfPages } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/api/pessoas/PeopleService';

export const ListingPeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    PeopleService.getAll(1, search).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
        return;
      }
      console.log(result);
    });
  }, [search]);

  return (
    <BaseLayoutOfPages
      title="List of people"
      toolbar={
        <ListingTools
          showInputSearch
          newTextButton="Add"
          searchText={search}
          changeInputSearch={(texto) =>
            setSearchParams({ search: texto }, { replace: true })
          }
        />
      }
    ></BaseLayoutOfPages>
  );
};
