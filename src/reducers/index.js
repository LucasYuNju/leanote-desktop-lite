import { combineReducers } from 'redux';
import { notes, displayedNotes, selectedNote } from './note';
import { notebooks, selectedNotebook } from './notebook';
import user from './user';

const rootReducer = combineReducers({
  displayedNotes,
  notes,
  notebooks,
  selectedNote,
  selectedNotebook,
  user,
});

export default rootReducer;
