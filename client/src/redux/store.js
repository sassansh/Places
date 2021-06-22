import { combineReducers, createStore } from 'redux';

import categoryReducer from './reducers/categoryReducer';
import groupReducer from './reducers/groupReducer';
import placeReducer from './reducers/placeReducer';
import userReducer from './reducers/userReducer';

const allReducer = combineReducers({
  groups: groupReducer,
  places: placeReducer,
  categories: categoryReducer,
  users: userReducer
});

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store; 