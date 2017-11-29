import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Main from './main-page/Main';
import ReadMore from './read-more-page/ReadMore';
import NotFound from './404/NotFound';

class App extends React.Component {
  render() {
    return (
        <div>
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route exact path='/read-more/:id' component={ReadMore}/>


            <Route exact path='/newPost' component={NotFound}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
    );
  }
}

export default App;