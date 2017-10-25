import React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomePage from './home-page/Index';
import SearchPage from './search-page/Index';
import NotFound from './404/Index';

class App extends React.Component {
  render() {
    return (
        <div>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/search' component={SearchPage}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
    );
  }
}

export default App;