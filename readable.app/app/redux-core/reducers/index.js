import {combineReducers} from 'redux';

import posts from './posts';
import categories from './categories';
import comments from './comments';
import snackInfo from './snackInfo';

export default combineReducers({
  posts,
  categories,
  comments,
  snackInfo,
});