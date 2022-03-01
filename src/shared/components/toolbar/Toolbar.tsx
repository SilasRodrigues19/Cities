import {
  Icon,
  InputAdornment,
  Box,
  Button,
  Paper,
  TextField,
  useTheme,
} from '@mui/material';

interface IToolbar {
  searchText?: string;
  showInputSearch?: boolean;
  changeInputSearch?: (newText: string) => void;
  newTextButton?: string;
  showNewButton?: boolean;
  changeNewButton?: () => void;
}

export const Toolbar: React.FC<IToolbar> = ({
  searchText = '',
  showInputSearch = false,
  changeInputSearch,
  newTextButton = 'Novo',
  showNewButton = true,
  changeNewButton,
}) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      {showInputSearch && (
        <TextField
          value={searchText}
          onChange={(e) => changeInputSearch?.(e.target.value)}
          size="small"
          label="Pesquisar"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
        />
      )}
      <Box display="flex" flex={1} justifyContent="end">
        {showNewButton && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={changeNewButton}
            endIcon={<Icon>add</Icon>}
          >
            {newTextButton}
          </Button>
        )}
      </Box>
    </Box>
  );
};
