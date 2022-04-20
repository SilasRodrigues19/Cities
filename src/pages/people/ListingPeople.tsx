import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListingTools } from '../../shared/components';
import { BaseLayoutOfPages } from '../../shared/layouts';
import { Environment } from '../../shared/environment/index';
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
  TableFooter,
  TableRow,
  TableCell,
  Paper,
  useTheme,
  LinearProgress,
  Pagination,
} from '@mui/material';

export const ListingPeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const theme = useTheme();
  const colorThemeStyle = theme.palette.mode == 'light' ? '#1e1e1e' : '#cacaca';

  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListingPeople[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
          alert(result.message);
          return;
        }
        console.log(result);

        setTotalCount(result.totalCount);
        setRows(result.data);
      });
    });
  }, [search, page]);

  return (
    <BaseLayoutOfPages
      title="List of people"
      toolbar={
        <ListingTools
          showInputSearch
          newTextButton="Add"
          searchText={search}
          changeInputSearch={(texto) =>
            setSearchParams({ search: texto, page: '1' }, { replace: true })
          }
        />
      }
    >
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
              <TableCell>Action</TableCell>
              <TableCell>Fullname</TableCell>
              <TableCell>Mail</TableCell>
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
                  -
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
            {(totalCount > 0 && totalCount > Environment.ROWS_LIMIT) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / Environment.ROWS_LIMIT)}
                    onChange={(e, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
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
