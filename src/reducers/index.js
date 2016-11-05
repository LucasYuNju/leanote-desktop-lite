import { combineReducers } from 'redux';
import entities from './entities';
import note from './note';
import noteList from './noteList';
import user from './user';

export default combineReducers({
  entities,
  note,
  noteList,
  user,
});
