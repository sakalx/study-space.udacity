import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Main from './pages/main/Main';
import UpdatePost from './pages/update-post/UpdatePost';
import ReadMore from './pages/read-post/ReadMore';
import NotFound from './pages/404/NotFound';

const App = () =>
    <Switch>
          <Route exact path='/' component={Main}/>
          <Route exact path='/categories/:loadCategories' component={Main}/>
          <Route exact path='/categories/' component={Main}/>
          <Route exact path='/update-post' component={UpdatePost}/>
          <Route exact path='/update-post/:id' component={UpdatePost}/>
          <Route exact path='/:category/:id' component={ReadMore}/>
          <Route component={NotFound}/>
    </Switch>;

export default App;