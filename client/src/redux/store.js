import { combineReducers, createStore } from 'redux';

import groupReducer from './reducers/groupReducer';
import placeReducer from './reducers/placeReducer';

const allReducer = combineReducers({
  groups: groupReducer,
  places: placeReducer
});

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store; 