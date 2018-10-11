import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';
import payment from './payment';

const reducers = combineReducers({
    payment
});

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
