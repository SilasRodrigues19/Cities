import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListingTools } from '../../shared/components';
import { BaseLayoutOfPages } from '../../shared/layouts';

export const ListingCities: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  return (
    <BaseLayoutOfPages
      title="Cities Listing"
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
