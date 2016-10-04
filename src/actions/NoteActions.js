import types from '../constants/ActionTypes';

export function receiveNotes(status, notes) {
  return { type: types.RECEIVE_NOTES, status, value: notes };
}

export function fetchNotes(notebookId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      service.note.getNotes(notebookId, (res) => {
        if (res) {
          console.log('fetch note res:', res);
          // dispatch(receiveNotes('success', res));
        }
        else {
          // dispatch(receiveNotes('error'));
        }
      })
    });
  }
}
