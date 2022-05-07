import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ListingTools } from '../../shared/components';
import { BaseLayoutOfPages } from '../../shared/layouts';
import { Environment } from '../../shared/environment';
import {
  PeopleService,
  IListingPeople,
} from '../../shared/services/api/people/PeopleService';
import { useDebounce } from '../../shared/hooks';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Paper,
  useTheme,
  LinearProgress,
  Pagination,
  IconButton,
  Icon,
  Tooltip,
} from '@mui/material';

import toast, { Toaster } from 'react-hot-toast';

export const ListingPeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const theme = useTheme();
  const colorThemeStyle = theme.palette.mode == 'light' ? '#1e1e1e' : '#cacaca';

  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListingPeople[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PeopleService.getAll(page, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          toast.remove();
          toast.error(result.message, {
            duration: 5000,
            position: 'top-right',
          });
          return;
        }
        console.log(result);
        toast.remove();
        toast.success('Successfully loaded', {
          duration: 5000,
          position: 'top-right',
        });
        setTotalCount(result.totalCount);
        setRows(result.data);
      });
    });
  }, [search, page]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete?')) {
      PeopleService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          toast.error(result.message, {
            duration: 5000,
            position: 'top-right',
          });
          return;
        }
        setRows((oldRows) => [...oldRows.filter((oldRow) => oldRow.id !== id)]);
        toast.error('Deleted', {
          duration: 5000,
          position: 'top-right',
        });
      });
    }
  };

  return (
    <BaseLayoutOfPages
      title="List of people"
      toolbar={
        <ListingTools
          showInputSearch
          newTextButton="Add"
          searchText={search}
          changeNewButton={() => navigate('/people/details/new')}
          changeInputSearch={(texto) =>
            setSearchParams({ search: texto, page: '1' }, { replace: true })
          }
        />
      }
    >
      <Toaster
        toastOptions={{
          style: {
            width: '100%',
            background: theme.palette.mode == 'light' ? '#1e1e1e' : '#cacaca',
            color: theme.palette.mode == 'dark' ? '#1e1e1e' : '#fff',
            padding: '10px 50px',
            userSelect: 'none',
          },
        }}
      />
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          m: 1,
          borderRadius: '1rem',
          width: 'auto',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="8%">Action</TableCell>
              <TableCell>Fullname</TableCell>
              <TableCell width="45%">Mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ id, fullName, email }) => (
              <TableRow key={id}>
                <TableCell
                  sx={{
                    color: colorThemeStyle,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/people/details/${id}`)}
                  >
                    <Tooltip title="Edit">
                      <Icon>mode_edit_outlined</Icon>
                    </Tooltip>
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(id)}>
                    <Tooltip title="Delete">
                      <Icon>delete_icon</Icon>
                    </Tooltip>
                  </IconButton>
                </TableCell>
                <TableCell
                  sx={{
                    color: colorThemeStyle,
                  }}
                >
                  {fullName}
                </TableCell>
                <TableCell
                  sx={{
                    color: colorThemeStyle,
                  }}
                >
                  {email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LISTING}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.ROWS_LIMIT && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / Environment.ROWS_LIMIT)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { search, page: newPage.toString() },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </BaseLayoutOfPages>
  );
};
