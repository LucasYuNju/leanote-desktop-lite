import { combineReducers } from 'redux';
import { notes, selectedNoteId } from './note';
import { notebooks, selectedNotebookId } from './notebook';
import user from './user';

/*
state = {
  notes: {
    ['20dr92']: {
      NoteId: string,
      Title: string,
      Content: string,
    },
    ...
  }
  notebooks: {
    ['root']: {
      Title: string
      NotebookId: string,
      NoteIds: [],
      ChildIds: [],
    },
    ['57b574']: {
      ...
    },
    ...
  },
  selectedNotebookId: string,
  selectedNoteId: string,
  user: {},
}
 */

const rootReducer = combineReducers({
  notes,
  notebooks,
  selectedNoteId,
  selectedNotebookId,
  user,
});

export default rootReducer;
