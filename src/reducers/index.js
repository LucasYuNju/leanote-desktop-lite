import { combineReducers } from 'redux';
import note from './note';
import notebooks from './notebook';
import user from './user';

/*
notebooks are flat,

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
}

 */

const rootReducer = combineReducers({
  note,
  notebooks,
  user,
});

export default rootReducer;
