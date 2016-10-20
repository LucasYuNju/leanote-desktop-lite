import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

function flattern(res, notebook) {
  res[notebook.NotebookId] = notebook;
  notebook.ChildIds = notebook.Subs.map(node => node.NotebookId);
  notebook.Subs.forEach(node => flattern(res, node));
  notebook.Subs = null;
}

function note(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_NOTES:
      if (action.value.length > 0) {
        const notes = {};
        action.value.forEach(note => {
          notes[note.NoteId] = note;
        })
        return {
          ...state,
          ...notes
        }
      }
      return state;
    case types.UPDATE_NOTE_SUCCEEDED:
      const note = state[action.note.NoteId]
      const mergedNote = {
        ...note,
        ...action.note,
      }
      return {
        ...state,
        [mergedNote.NoteId]: mergedNote,
      }
    default:
      return state;
  }
}

const initialNotebook = {
  root: {
    ChildIds: [],
  }
}

function notebook(state = initialNotebook, action) {
  switch (action.type) {
    case types.RECEIVE_NOTES:
      if (action.value.length > 0) {
        // FIXME modify state directly
        const notebookId = action.value[0].NotebookId;
        const notebook = state[notebookId];
        notebook.NoteIds = action.value.map(note => note.NoteId);
      }
      return state;
    case types.RECEIVE_NOTEBOOKS:
      if (action.value) {
        const result = {};
        const root = {
          NotebookId: 'root',
          Subs: action.value,
        };
        flattern(result, root);
        return result;
      }
    default:
      return state;
  }
}

export default combineReducers({
  note,
  notebook,
});
