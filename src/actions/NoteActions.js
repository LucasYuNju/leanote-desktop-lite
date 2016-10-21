import * as types from '../constants/ActionTypes';

export function selectNote(noteId) {
  return { type: types.SELECT_NOTE, noteId };
}

export function receiveNotes(status, notes, notebookId) {
  return { type: types.RECEIVE_NOTES, status, notes, notebookId };
}

export function fetchNotes(notebookId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      service.note.getNotes(notebookId, (res) => {
        if (res) {
          dispatch(receiveNotes('success', res, notebookId));
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

/**
 * push changed notes to server
 */
export function sendNotes() {
  return { type: types.SEND_NOTES_REQUESTED };
}
