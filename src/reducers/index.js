import { combineReducers } from 'redux';

import editMode from './editMode';
import entities from './entities';
import noteList from './noteList';
import router from './router';
import user from './user';

export default combineReducers({
	editMode,
  entities,
	router,
  noteList,
  user,
});
