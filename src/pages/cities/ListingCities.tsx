import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ListingTools } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { Environment } from '../../shared/environment';
import {
  CitiesService,
  IListingCities,
} from '../../shared/services/api/cities/CitiesService';
import { useDebounce, useTitle } from '../../shared/hooks';
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
  Pagination,
  IconButton,
  Icon,
  Tooltip,
  Stack,
  useMediaQuery,
  Theme,
} from '@mui/material';


import toast, { Toaster } from 'react-hot-toast';

import { Icon as Loader } from '@iconify/react';
import Swal from 'sweetalert2'
import 'animate.css';

export const ListingCities: React.FC = () => {

  useTitle('List of Cities');

  const [searchParams, setSearchParams] = useSearchParams();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const theme = useTheme();
  const colorThemeStyle = theme.palette.mode == 'light' ? '#1e1e1e' : '#cacaca';

  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListingCities[]>([]);
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
      toast.remove();
      CitiesService.getAll(page, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          toast.error(result.message, {
            duration: 5000,
            position: 'top-right',
          });
          return;
        }
        setTotalCount(result.totalCount);
        setRows(result.data);
      });
    });
  }, [search, page]);


  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure you want to delete?',
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
        icon: 'animate__animated animate__swing animate__delay-1s',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        CitiesService.deleteById(id)
          .then((result) => {
            if (result instanceof Error) {
              toast.error(result.message, {
                duration: 5000,
                position: 'top-right',
              });
              return;
            }
            setRows((oldRows) => [...oldRows.filter((oldRow) => oldRow.id !== id)]);
            Swal.fire({
              title: 'Deleted!',
              text: 'The city has been deleted.',
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
      }
    })
  };

  return (
    <BaseLayout
      title="List of cities"
      toolbar={
        <ListingTools
          showInputSearch
          newTextButton="Add"
          searchText={search}
          changeNewButton={() => navigate('/cities/details/new')}
          changeInputSearch={(texto) =>
            setSearchParams({ search: texto, page: '1' }, { replace: true })
          }
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
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          m: 1,
          borderRadius: '1rem',
          width: 'auto',
        }}
      >
        <Table
          sx={{ borderBottom: '2px solid transparent' }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: 'none', }} width="15%">Action</TableCell>
              <TableCell sx={{ borderBottom: 'none', }}>Name</TableCell>
            </TableRow>
            {isLoading && (
              <TableRow>
                <TableCell sx={{ borderBottom: 'none', }} colSpan={3} align="center">
                  <Loader icon="eos-icons:three-dots-loading" style={{ color: "#7b1fa2", fontSize: '14rem' }} />
                </TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {rows.map(({ id, name }) => (
              <TableRow key={id}>
                <TableCell
                  sx={{
                    color: colorThemeStyle,
                    borderBottom: '1px solid rgba(80, 80, 80, .1)',
                  }}
                >
                  <IconButton
                    sx={{
                      '&:hover': {
                        filter: 'brightness(.8)'
                      }
                    }}
                    size="small"
                    onClick={() => navigate(`/cities/details/${id}`)}
                  >
                    <Tooltip title="Edit">
                      <Icon fontSize="small">mode_edit_outlined</Icon>
                    </Tooltip>
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(id)}>
                    <Tooltip title="Delete">
                      <Icon fontSize="small">delete_icon</Icon>
                    </Tooltip>
                  </IconButton>
                </TableCell>
                <TableCell
                  sx={{
                    color: colorThemeStyle,
                    borderBottom: '1px solid rgba(80, 80, 80, .1)',
                  }}
                >
                  {name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LISTING}</caption>
          )}

          <TableFooter>
            {totalCount > 0 && totalCount > Environment.ROWS_LIMIT && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Stack spacing={2}>
                    <Pagination
                      shape="rounded"
                      page={page}
                      count={Math.ceil(totalCount / Environment.ROWS_LIMIT)}
                      onChange={(_, newPage) =>
                        setSearchParams(
                          { search, page: newPage.toString() },
                          { replace: true }
                        )
                      }
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};
