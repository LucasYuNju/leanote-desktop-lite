import { combineReducers } from 'redux';
import entities from './entities';
import navigator from './navigator';
import editMode from './editMode';
import noteList from './noteList';
import user from './user';

export default combineReducers({
	editMode,
  entities,
	navigator,
  noteList,
  user,
});
