import React from 'react';
import { render as ReactDomRender, Switch } from 'react-dom';
import { Route, HashRouter, BrowserRouter  } from 'react-router-dom';
import { Provider } from 'react-redux';

import ReduxStore from './reducers/store';
import Routes from './routes/routes.js'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import initialize from "./initializeFirebase";

initialize();

ReactDomRender(
    <Provider store={ReduxStore}>
      <MuiThemeProvider>
        <Routes />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
registerServiceWorker();
