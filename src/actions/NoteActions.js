import { arrayOf, normalize } from 'normalizr';
import { camelizeKeys, pascalizeKeys } from 'humps';

import * as types from '../constants/ActionTypes';
import { noteSchema } from '../constants/Schemas';
import { CALL_API } from '../middleware/api';

export function selectNote(noteId) {
  return { type: types.SELECT_NOTE, noteId };
}

export function toggleEditMode(noteId) {
	return { type: types.TOGGLE_EDIT_MODE, noteId };
}

export function fetchNotesIfNeeded(notebookId) {
	return (dispatch, getState) => {
		const notebook = getState().entities.notebooks[notebookId];
		if (!notebook.fetched) {
			dispatch(fetchNotes(notebookId));
		}
	}
}

export function fetchNotes(notebookId) {
	return (dispatch, getState) => {
		return dispatch({
			types: [ types.GET_NOTES_REQUEST, types.GET_NOTES_SUCCESS, types.GET_NOTES_FAILURE ],
			url: 'note/getNotes',
			params: {
				notebookId,
			},
			schema: arrayOf(noteSchema),
			notebookId,
		}).then(action => {
			for (let noteId of action.payload.result) {
        dispatch(fetchNoteAndContent(noteId, notebookId));
      }
			return action;
		});
	}
}

export function fetchNoteAndContent(noteId, notebookId) {
  return (dispatch, getState) => {
		return dispatch({
			types: [ null, types.GET_NOTE_CONTENT_SUCCESS, types.GET_NOTE_CONTENT_FAILURE ],
			url: 'note/getNoteAndContent',
			params: {
				noteId,
			},
			schema: noteSchema,
			notebookId,
		});
	}
}

/**
 * param change: changed part of note object, only NoteId is required
 */
export function updateNote(changedNote) {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_NOTE, note: changedNote });
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

export function sortNoteList(key) {
  return { type: types.SORT_NOTE_LIST, key };
}
