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
    case types.ADD_NOTE:
      return {
        ...state,
        [action.note.NoteId]: action.note,
      };
    case types.RECEIVE_NOTES:
      if (action.notes.length > 0) {
        const notes = {};
        action.notes.forEach(note => {
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
    case types.ADD_NOTE:
      // TODO rewrite with immutable
      state[action.notebookId].NoteIds.unshift(action.note.NoteId);
      return state;
    case types.RECEIVE_NOTES:
      let notebook = state[action.notebookId];
      if (action.notes.length > 0) {
        const newNotebook = {
          ...notebook,
          NoteIds: action.notes.map(note => note.NoteId),
        }
        return {
          ...state,
          [action.notebookId]: newNotebook,
        }
      }
      return {
        ...state,
        [action.notebookId]: {
          ...notebook,
          NoteIds: [],
        },
      };
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
