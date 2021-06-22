import { combineReducers, createStore } from 'redux';

import categoryReducer from './reducers/categoryReducer';
import groupReducer from './reducers/groupReducer';
import placeReducer from './reducers/placeReducer';

const allReducer = combineReducers({
  groups: groupReducer,
  places: placeReducer,
  categories: categoryReducer
});

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store; 