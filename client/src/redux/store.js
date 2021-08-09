import { applyMiddleware, combineReducers, createStore } from 'redux';

import categoryReducer from './reducers/categoryReducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import groupReducer from './reducers/groupReducer';
import placeReducer from './reducers/placeReducer';
import reviewReducer from './reducers/reviewReducer';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';

const allReducer = combineReducers({
  users: userReducer,
  groups: groupReducer,
  categories: categoryReducer,
  places: placeReducer,
  reviews: reviewReducer
});

const store = createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
