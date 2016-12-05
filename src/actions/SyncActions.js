import * as types from '../constants/ActionTypes';
import { getLastUsn } from '../actions/UserActions';
import { fetchOutdatedNotebooks } from '../actions/NotebookActions';

export function syncIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(getLastUsn())
      .then(() => {
        const { user } = getState();
        if (user.localUsn < user.remoteUsn) {
          return dispatch(pull(user.localUsn));
        }
        if (user.localUsn > user.remoteUsn) {
          return dispatch(push());
        }
      });
  }
}

export function pull(localUsn) {
  return (dispatch) => {
    return dispatch(fetchOutdatedNotebooks(localUsn));
  }
}

export function pullNotes() {

}

export function pullNotebooks() {
  return {

  }
}

export function push() {

}
