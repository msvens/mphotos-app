import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';

import './App.css';
import PrimaryAppBar from "./components/Header";

function App() {

  const theme = createMuiTheme({
    typography: {
      fontFamily: 'Roboto',
      h4: {
        textTransform: 'uppercase',
      },
      h6: {
        fontWeight: 'light'
      }
    },
  });

  return (
      <ThemeProvider theme={theme}>
        <PrimaryAppBar/>
      </ThemeProvider>
  );
}

export default App;
