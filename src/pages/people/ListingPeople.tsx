import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ListingTools } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
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
  Stack,
  useMediaQuery,
  Theme,
  Link
} from '@mui/material';


import toast, { Toaster } from 'react-hot-toast';

import Swal from 'sweetalert2'
import 'animate.css';

export const ListingPeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

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
      toast.remove();
      PeopleService.getAll(page, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          toast.error(result.message, {
            duration: 5000,
            position: 'top-right',
          });
          return;
        }
        /*
        Success Message during debounce
        if(result.totalCount > 1) {
          toast.remove();
          toast.success('Successfully loaded', {
            duration: 5000,
            position: 'top-right',
          });
        }
        if(result.totalCount === 0) toast.remove();
        */
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
        PeopleService.deleteById(id)
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
              text: 'The user has been deleted.',
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
              <TableCell sx={{ borderBottom: 'none', }}>Fullname</TableCell>
              <TableCell sx={{ borderBottom: 'none', }} width="45%">Mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ id, fullName, email }) => (
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
                    onClick={() => navigate(`/people/details/${id}`)}
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
                  {fullName}
                </TableCell>
                <TableCell
                  sx={{
                    color: colorThemeStyle,
                    borderBottom: '1px solid rgba(80, 80, 80, .1)',
                  }}
                >

                  <Link color="inherit" underline="hover" href={`mailto:${email}`}>{email}</Link>
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
