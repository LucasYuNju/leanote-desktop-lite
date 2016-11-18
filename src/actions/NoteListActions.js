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

export function selectNoteList(noteListType, noteListId) {
	return (dispatch, getState) => {
    // Notes are expected to be cached.
		if (noteListType === 'notebooks') {
			dispatch(fetchNotes(noteListId)).then(() => {
				// navigateTo(noteListType, noteListId, 'notes');
	      // dispatch({ type: types.SELECT_NOTE_LIST, noteListType, noteListId });
	    });
		}
		else {
			// navigateTo(noteListType, noteListId, 'notes');
			// dispatch({ type: types.SELECT_NOTE_LIST, noteListType, noteListId });
		}
  }
}

export function addNote(notebookId, noteId) {
  return { type: types.ADD_NOTE, notebookId, noteId };
}
