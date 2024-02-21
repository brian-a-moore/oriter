import { ThemeOptions, createTheme } from '@mui/material/styles';

export const theme: ThemeOptions = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    mode: 'dark',
    primary: {
      light: '#9FB7FE',
      main: '#5D86FE',
      dark: '#3C67E4',
      contrastText: '#fff',
    },
    secondary: {
      light: '#a080ff',
      main: '##dc5fff',
      dark: '##ff68cc',
      contrastText: '#000',
    },
    error: {
      light: '#FDA4AF',
      main: '#FB7185',
      dark: '#F43F5E',
      contrastText: '#000',
    },
  },
});