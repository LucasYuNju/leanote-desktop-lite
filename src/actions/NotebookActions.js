import * as types from '../constants/ActionTypes';
import { fetchNotes, selectNote } from '../actions/NoteActions';

export function receiveNotebooks(status, value) {
  return { type: types.RECEIVE_NOTEBOOKS, status, value };
}

export function fetchNotebooks() {
  return (dispatch) => {
    service.notebook.getNotebooks((res) => {
      dispatch(receiveNotebooks('success', res));
    });
  };
}

export function selectNotebook(notebookId) {
  return (dispatch) => {
    // Notes are expected to be cached.
    dispatch(fetchNotes(notebookId)).then(() => {
      dispatch({ type: types.SELECT_NOTEBOOK, value: notebookId });
    });
  }
}

export function addNote(notebookId, noteId) {
  return { type: types.ADD_NOTE, notebookId, noteId };
}
