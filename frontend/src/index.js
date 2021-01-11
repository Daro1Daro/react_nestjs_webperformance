import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiThemeProvider } from '@material-ui/core';

import { store, persistor } from './redux/store';
import { theme } from './muiTheme';

import './index.css';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <App/>
          </MuiThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
