import { arrayOf, normalize } from 'normalizr';
import { camelizeKeys, pascalizeKeys } from 'humps';

import { constructUrl, destructUrl } from '../util/RouteUtil';
import { fetchNotes, selectNote } from '../actions/NoteActions';
import { navigateTo } from '../actions/NavigatorActions';
import { notebookSchema } from '../constants/Schemas';
import * as types from '../constants/ActionTypes';

export function receiveNotebooks(status, entities, rootIds) {
  return { type: types.RECEIVE_NOTEBOOKS, status, entities, rootIds };
}

export function fetchNotebooks() {
  return (dispatch) => {
    service.notebook.getNotebooks((res) => {
      const normalized = normalize(camelizeKeys(res), arrayOf(notebookSchema));
      dispatch(receiveNotebooks('success', normalized.entities.notebooks, normalized.result));
    });
  };
}

export function addNote(notebookId, noteId) {
  return { type: types.ADD_NOTE, notebookId, noteId };
}
