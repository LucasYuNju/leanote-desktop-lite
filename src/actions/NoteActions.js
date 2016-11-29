import { arrayOf, normalize } from 'normalizr';
import { camelizeKeys, pascalizeKeys } from 'humps';

import * as types from '../constants/ActionTypes';
import { noteSchema } from '../constants/Schemas';
import { CALL_API } from '../middleware/api';

export function selectNote(noteId) {
  return { type: types.SELECT_NOTE, noteId };
}

export function receiveNotes(status, entities, ids, notebookId) {
  return { type: types.RECEIVE_NOTES, status, entities, ids, notebookId };
}

export function toggleEditMode(noteId) {
	return { type: types.TOGGLE_EDIT_MODE, noteId };
}

export function fetchNotesIfNeeded(notebookId) {
	return (dispatch, getState) => {
		const notebook = getState().entities.notebooks.byId[notebookId];
		if (notebook.numberNotes !== notebook.noteIds.length) {
			dispatch(fetchNotes(notebookId));
		}
	}
}

export function fetchNotes(notebookId) {
	return (dispatch) => {
		return dispatch({
			[CALL_API] : {
				types: [ 'NOTES_REQUEST', 'NOTES_SUCCESS', 'NOTES_FAILURE' ],
				endpoint: 'note/getNotes',
				query: {
					notebookId,
				},
				schema: arrayOf(noteSchema),
			},
		}).then(result => {
			dispatch(receiveNotes('success', result.response.entities.notes, result.response.result, notebookId));
      for (let noteId of result.response.result) {
        dispatch(fetchNoteAndContent(noteId, notebookId));
      }
			return result;
		});
	}
}

export function fetchNoteAndContent(noteId, notebookId) {
  return (dispatch) => {
		return dispatch({
			[CALL_API] : {
				types: [ 'NOTE_REQUEST', 'NOTE_SUCCESS', 'NOTE_FAILURE' ],
				endpoint: 'note/getNoteAndContent',
				query: {
					noteId,
				},
				schema: noteSchema,
			},
		}).then(result => {
			dispatch(receiveNotes('success', result.response.entities.notes, [result.response.result], notebookId));
			return result;
		});
	}
}

/**
 * param change: changed part of note object, only NoteId is required
 */
export function updateNote(changedNote) {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_NOTE_REQUESTED, note: changedNote });
    service.note.updateNoteOrContent(pascalizeKeys(changedNote), (result) => {
      if (result) {
        dispatch({ type: types.UPDATE_NOTE_SUCCEEDED, note: camelizeKeys(result) });
      }
      else {
        dispatch({ type: types.UPDATE_NOTE_FAILED });
      }
    });
  }
}

export function createNote(note, notebookId) {
  return (dispatch) => {
    dispatch({ type: types.ADD_NOTE, note, notebookId });
    dispatch({ type: types.SELECT_NOTE, noteId: note.noteId });
  }
}

/**
 * push changed notes to server
 */
// export function sendNotes() {
//   return { type: types.SEND_NOTES_REQUESTED };
// }

export function sortNoteList(key) {
  return { type: types.SORT_NOTE_LIST, key };
}
