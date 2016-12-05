import * as types from '../constants/ActionTypes';
import { getLastUsn } from '../actions/UserActions';

export function syncIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(getLastUsn())
      .then(() => {
        const { user } = getState();
      });
  }
}

export function pullAll() {

}
