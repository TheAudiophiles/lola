import { combineReducers } from 'redux';
import searchReducer from './search';

const rootReducer = combineReducers({
  search: searchReducer
});

export default rootReducer;
