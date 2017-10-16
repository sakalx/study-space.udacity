import React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomePage from './home-page/HomePage';
import SearchPage from './search-page/SearchPage';
import NotFound from './NotFound';

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