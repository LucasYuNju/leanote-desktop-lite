import { combineReducers } from 'redux';
import index from './index';
import note from './note';
import noteList from './noteList';
import user from './user';

export default combineReducers({
  index,
  note,
  noteList,
  user,
});
