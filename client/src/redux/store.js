import { combineReducers, createStore } from 'redux';

import categoryReducer from './reducers/categoryReducer';
import groupReducer from './reducers/groupReducer';
import placeReducer from './reducers/placeReducer';
import reviewReducer from './reducers/reviewReducer';
import userReducer from './reducers/userReducer';

const allReducer = combineReducers({
  users: userReducer,
  groups: groupReducer,
  categories: categoryReducer,
  places: placeReducer,
  reviews:reviewReducer
});

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store; 