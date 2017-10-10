import 'root/style/main.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from './helpers.js/mui/theme';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>

    </MuiThemeProvider>,
    document.getElementById('root'),
);