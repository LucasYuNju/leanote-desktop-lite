import { arrayOf, normalize } from 'normalizr';

import * as types from '../constants/ActionTypes';
import { fetchNotes, selectNote } from '../actions/NoteActions';
import { notebookSchema } from '../constants/Schemas';

export function receiveNotebooks(status, entities, rootIds) {
  return { type: types.RECEIVE_NOTEBOOKS, status, entities, rootIds };
}

export function fetchNotebooks() {
  return (dispatch) => {
    service.notebook.getNotebooks((res) => {
      const normalized = normalize(res, arrayOf(notebookSchema));
      dispatch(receiveNotebooks('success', normalized.entities.notebooks, normalized.result));
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
