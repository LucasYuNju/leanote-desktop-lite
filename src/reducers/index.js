import { combineReducers } from 'redux';
import note from './note';
import notebooks from './notebook';
import user from './user';

const rootReducer = combineReducers({
  note,
  notebooks,
  user,
});

export default rootReducer;
