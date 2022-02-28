import { createTheme } from '@mui/material';
import { yellow, cyan } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: '#cacaca',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#cacaca',
    },
    background: {
      default: '#303134',
      paper: '#202124',
    },
  },
  typography: {
    allVariants: {
      color: '#cacaca',
    },
  },
});
