import { createTheme } from '@mui/material';
import { purple, cyan } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: purple[700],
      dark: purple[800],
      light: purple[500],
      contrastText: '#cacaca',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#cacaca',
    },
    background: {
      default: '#181F2E',
      paper: '#111827',
    },
  },
  typography: {
    allVariants: {
      color: '#cacaca',
    },
  },
});
