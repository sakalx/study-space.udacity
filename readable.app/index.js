import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom'; //HashRouter BrowserRouter
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from './theme';

import store from './app/store';
import App from './app/App';

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <Provider store={store}>
        <HashRouter>
          <App/>
        </HashRouter>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'),
);