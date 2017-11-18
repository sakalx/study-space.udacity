import {applyMiddleware, createStore} from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(promise(), thunk, logger);

const store = createStore(
    reducer,
    composeEnhancers(middleware),
);

export default store;

