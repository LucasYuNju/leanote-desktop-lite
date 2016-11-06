import { arrayOf, normalize } from 'normalizr';

import * as types from '../constants/ActionTypes';
import { noteSchema } from '../constants/Schemas';

export function selectNote(noteId) {
  return { type: types.SELECT_NOTE, noteId };
}

export function receiveNotes(status, entities, ids, notebookId) {
  return { type: types.RECEIVE_NOTES, status, entities, ids, notebookId };
}

export function fetchNotes(notebookId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      service.note.getNotes(notebookId, (res) => {
        if (res) {
          const normalized = normalize(res, arrayOf(noteSchema));
          dispatch(receiveNotes('success', normalized.entities.notes, normalized.result, notebookId));
          resolve();
        }
        else {
          dispatch(receiveNotes('error'));
          reject();
        }
      })
    });
  }
}

/**
 * param change: changed part of note object, only NoteId is required
 */
export function updateNote(changedNote) {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_NOTE_REQUESTED, note: changedNote });
    service.note.updateNoteOrContent(changedNote, (result) => {
      if (result) {
        dispatch({ type: types.UPDATE_NOTE_SUCCEEDED, note: result });
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
    dispatch({ type: types.SELECT_NOTE, noteId: note.NoteId });
  }
}

/**
 * push changed notes to server
 */
export function sendNotes() {
  return { type: types.SEND_NOTES_REQUESTED };
}
