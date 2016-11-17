import { combineReducers } from 'redux';
import entities from './entities';
import navigator from './navigator';
import note from './note';
import noteList from './noteList';
import user from './user';

export default combineReducers({
  entities,
	navigator,
  note,
  noteList,
  user,
});
