import React from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import MPhotosApp from "./components/MPhotosApp";

function App() {

  let theme = createMuiTheme({
    palette: {
      type: 'light'
    },
    typography: {
      body1: {
        lineHeight: '1.5em',
      },
      body2: {
        lineHeight: '1.3em',
      },
      h4: {
        marginTop: '2em',
        textTransform: 'uppercase',
      },
      h5: {
        marginTop: '2em',
        textTransform: 'uppercase',
      },
      h6: {
        fontWeight: 'light'
      }
    },
  });

  theme = responsiveFontSizes(theme)

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <MPhotosApp/>
      </ThemeProvider>
  );
}

export default App;
