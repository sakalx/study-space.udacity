import React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomePage from './Test';
import NotFound from './404/Index';

class App extends React.Component {
  render() {
    return (
        <div>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
    );
  }
}

export default App;