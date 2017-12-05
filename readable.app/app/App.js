import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Main from './pages/main/Main';
import UpdatePost from './pages/update-post/UpdatePost';
import ReadMore from './pages/read-post/ReadMore';
import NotFound from './pages/404/NotFound';

class App extends React.Component {
  render() {
    return (
        <div>
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route exact path='/update-post' component={UpdatePost}/>
            <Route exact path='/update-post/:id' component={UpdatePost}/>
            <Route exact path='/read-more/:id' component={ReadMore}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
    );
  }
}

export default App;