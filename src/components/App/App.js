import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import { theme } from './theme';
import Navigation from '../Navigation/Navigation';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <CssBaseline />
          <Navigation />
        </ConfirmProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
