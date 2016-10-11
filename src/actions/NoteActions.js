import * as types from '../constants/ActionTypes';

export function selectNote(noteId) {
  return { type: types.SELECT_NOTE, value: noteId };
}

export function receiveNotes(status, notes) {
  return { type: types.RECEIVE_NOTES, status, value: notes };
}

export function fetchNotes(notebookId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      service.note.getNotes(notebookId, (res) => {
        if (res) {
          dispatch(receiveNotes('success', res));
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
