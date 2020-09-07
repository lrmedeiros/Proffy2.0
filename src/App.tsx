import React from 'react';

import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
} from '@material-ui/core';

import Routes from './routes';

import './assets/styles/global.css';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8257E5',
      light: '#9871F5',
      dark: '#774DD6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#04D361',
      dark: '#04BF58',
    },
    text: {
      primary: '#9C98A6',
      secondary: '#32264D',
      disabled: '#E6E6F0',
      hint: '#D4C2FF',
    },
    background: {
      default: '#F0F0F7',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Archivo',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
