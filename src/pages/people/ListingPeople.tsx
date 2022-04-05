import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListingTools } from '../../shared/components';
import { BaseLayoutOfPages } from '../../shared/layouts';
import {
  PeopleService,
  IListingPeople,
} from '../../shared/services/api/pessoas/PeopleService';
import { useDebounce } from '../../shared/hooks';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';

export const ListingPeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListingPeople[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PeopleService.getAll(1, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        console.log(result);

        setTotalCount(result.totalCount);
        setRows(result.data);
      });
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
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, borderRadius: '1rem', width: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Fullname</TableCell>
              <TableCell>Mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ id, fullName, email }) => (
              <TableRow key={id}>
                <TableCell sx={{ color: '#cacaca' }}>-</TableCell>
                <TableCell sx={{ color: '#cacaca' }}>{fullName}</TableCell>
                <TableCell sx={{ color: '#cacaca' }}>{email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseLayoutOfPages>
  );
};
