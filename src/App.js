import React from 'react';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import 'typeface-roboto';

import './App.css';
import PrimaryAppBar from "./components/Header";

function App() {

  const theme = createMuiTheme({
    typography: {
      fontFamily: 'Arial',
    },
    palette: {
      primary: {
        main: green[900]
      },
    },
  });

  return (
      <ThemeProvider theme={theme}>
        <PrimaryAppBar/>
      </ThemeProvider>
 /*   <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>*/
  );
}

export default App;
