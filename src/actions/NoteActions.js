import { arrayOf, normalize } from 'normalizr';
import { camelizeKeys, pascalizeKeys } from 'humps';

import * as types from '../constants/ActionTypes';
import { noteSchema } from '../constants/Schemas';
import { httpsToLeanote } from '../util/Protocol';

export function selectNote(noteId) {
  return { type: types.SELECT_NOTE, noteId };
}

export function toggleEditMode(noteId) {
	return { type: types.TOGGLE_EDIT_MODE, noteId };
}

export function fetchOutdatedNotes() {
  return async (dispatch, getState) => {
    while (true) {
      const action = await dispatch({
        types: [null, types.GET_NOTES_SUCCESS, null],
        url: 'note/getSyncNotes',
        params: {
          afterUsn: getState().user.localUsn.note,
          maxEntry: 50,
        },
        schema: arrayOf(noteSchema),
      });
      // Dispatch all networks at the same time will cause 404 error.
      action.payload.result
        .map(noteId => action.payload.entities.notes[noteId])
        .filter(note => !note.isDeleted && !note.isTrash)
        .reduce((promise, note) => {
          return promise.then(() => {
            return dispatch(fetchNoteAndContent(note.noteId));
          });
        }, Promise.resolve());
      if (action.payload.result.length === 0) {
        break;
      }
    }
  }
}

export function fetchNoteAndContent(noteId) {
  return (dispatch, getState) => {
		return dispatch({
			types: [ null, types.GET_NOTE_CONTENT_SUCCESS, types.GET_NOTE_CONTENT_FAILURE ],
			url: 'note/getNoteAndContent',
			params: {
				noteId,
			},
			schema: noteSchema,
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

export function sortNoteList(key) {
  return { type: types.SORT_NOTE_LIST, key };
}
