import { createStore, applyMiddleware, compose } from 'redux';
import initialState from './initialState';
import reducer from './reducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(
   compose(applyMiddleware(...middleware))));


export default store;