import * as types from '../constants/ActionTypes';
import { getLastUsn } from '../actions/UserActions';

export function syncIfNeeded() {
  return (dispatch) => {
    dispatch(getLastUsn).then((action) => {
    });
  }
}

export function pullAll() {

}
