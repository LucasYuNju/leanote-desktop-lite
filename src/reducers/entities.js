import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';
// import merge from 'lodash/merge';

function notes(state = {}, action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return {
        ...state,
        [action.note.noteId]: action.note,
      };
    case types.RECEIVE_NOTES:
      return {
        ...state,
        ...action.entities,
      }
    case types.UPDATE_NOTE_SUCCEEDED:
      return {
        ...state,
        [action.note.noteId]: action.note,
      };
    default:
      return state;
  }
}

const initialNotebook = {
  root: {
    notebookId: 'root',
    subs: [],
  }
};

function notebooks(state = initialNotebook, action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return {
        ...state,
        [action.notebookId]: {
          ...state[action.notebookId],
          noteIds: [
            action.note.noteId,
            ...state[action.notebookId].NoteIds,
          ],
        }
      }
    case types.RECEIVE_NOTES:
      return {
        ...state,
        [action.notebookId]: {
          ...state[action.notebookId],
          noteIds: action.ids,
        }
      }
    case types.RECEIVE_NOTEBOOKS:
      state = {
        ...state,
        ...action.entities,
      };
      return {
        ...state,
        root: {
          ...state.root,
          subs: action.rootIds,
        },
      };
    default:
      return state;
  }
}

export default combineReducers({
  notes,
  notebooks,
});
