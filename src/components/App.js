import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drill from './Drill';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark : '#000000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark : '#ba000d',
      contrastText: '#fff',
    },
  },
});

function App() {
  const algs = [
    "R U' R' U' R U2 R' U' R' D' R U2 R' D R",
    "y' R U2 R D R' U2 R D' R' U2 R' U' R U' R'",
    "y2 R2 D r' U2 r D' R' U2 R'",
    "y R U R2 D' R U R' D R2 U2 R'",
    "y' R U2 R2 D' R U2 R' D R2 U' R' U2 R U2 R'",
    "y2 R2 D R' U2 R D' R' U2 R'",
    "y' R U' R' U' R U2 R' U D R' U R U2 R' U R D'",
    "R' U' R U R U R' U' R' U F R U R U' R' F'",
    "y R' U' L U' R U L' U R' U' R U' R' U R",
    "y R' U R' U' D' R U' R' U2 R U' R' D R U' R",
    "y' R U' R' U R U R' U2 R' D' R U R' D R2 U R'",
    "y R U R' U R U' R' U R U' R' U' r' F R F' M'",
    "R2 D' r U2 r' D R U2 R",
    "y R2 D' R U' R' D R2 U' R' U2 R",
    "y2 R' U R U R' U2 R U R D R' U2 R D' R'",
    "y' R' U2 R' D' R U2 R' D R U2 R U R' U R",
    "R2 D' R U2 R' D R U2 R",
    "y' R' U2 R2 D R' U2 R D' R2 U R U2 R' U2 R",
    "y' R' U R U R' U2 R U' D' R U' R' U2 R U' R' D",
    "R U' R' D R' U' R D' R2 U R' U' R' U2 R'",
    "R U' R' D R' U' R D' R2 U2 R2 U' R' U' R2",
    "y R U r' F R' F' r U' R U R' U R U' R'",
    "y' R' U R U' R' U' R U2 R D R' U' R D' R2 U' R",
    "y' R U R' U2 F2 R U2 R' U2 R' F2 R2 U R'"
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Drill algs={algs} />
    </ThemeProvider>
  );
}

export default App;
