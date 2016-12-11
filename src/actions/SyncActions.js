import * as types from '../constants/ActionTypes';
import { getLastUsn } from '../actions/UserActions';
import { fetchOutdatedNotebooks } from '../actions/NotebookActions';
import { fetchOutdatedNotes } from '../actions/NoteActions';

export function syncIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(getLastUsn())
      .then(() => {
        const { user } = getState();
        const localUsn = Math.max(user.localUsn.note, user.localUsn.notebook);
        if (localUsn < user.remoteUsn) {
          return dispatch(pull());
        }
        if (localUsn > user.remoteUsn) {
          return dispatch(push());
        }
      });
  }
}

export function pull(localUsn) {
  return (dispatch) => {
    return dispatch(fetchOutdatedNotebooks()).then(() => {
      return dispatch(fetchOutdatedNotes());
    });
  }
}

export function push() {

}
