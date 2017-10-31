import React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomePage from './home-page/Index';
import NewUserPage from './new-user-page/Index';
import NotFound from './404/Index';

const App = () =>
    <div>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/newContact' component={NewUserPage}/>
        <Route component={NotFound}/>
      </Switch>
    </div>;

export default App;