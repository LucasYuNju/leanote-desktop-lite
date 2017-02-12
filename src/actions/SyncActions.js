import { fetchOutdatedNotes, pushNewNotes, pushDirtyNotes } from '../actions/NoteActions';
import { fetchOutdatedNotebooks } from '../actions/NotebookActions';
import { getLastUsn } from '../actions/UserActions';
import * as types from '../constants/ActionTypes';
import { noteSchema } from '../constants/Schemas';

export function syncIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(getLastUsn())
      .then((action) => {
        const remoteUsn = action.payload.lastSyncUsn;
        const localUsn = getState().user.localUsn;
        console.log('last sync usn', remoteUsn);

        const maxLocalUsn = Math.max(localUsn.note, localUsn.notebook, localUsn.tag);
        if (maxLocalUsn < remoteUsn) {
          return dispatch(pull());
        }
        if (maxLocalUsn > remoteUsn) {
          return dispatch(push());
        }
      });
  }
}

export function pull(localUsn) {
  return (dispatch) => {
    return dispatch(fetchOutdatedNotebooks())
      .then(() => {
        return dispatch(fetchOutdatedNotes());
      });
  }
}

/*
 * 将需要push的笔记，按照usn排序，依次push
 * 之后push新创建的笔记
 */
export function push() {
  return (dispatch, getState) => {
    return dispatch(pushDirtyNotes())
      .then(dispatch(pushNewNotes()));
  }
}
