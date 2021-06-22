import { combineReducers, createStore } from 'redux';

import groupReducer from './reducers/groupReducer';

const allReducer = combineReducers({
  groups: groupReducer,
});

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;