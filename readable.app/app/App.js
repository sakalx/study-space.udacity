import React from 'react';
import {Route, Switch} from 'react-router-dom';

import MainPag from './main.page/Index';
//import SearchPage from './search-page/Index';
import NotFound from './404/Index';

class App extends React.Component {
  render() {
    return (
        <div>
          <Switch>
            <Route exact path='/' component={MainPag}/>
            <Route exact path='/newPost' component={NotFound}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
    );
  }
}

export default App;

/*
 * Drawer
 * Badge
 * */