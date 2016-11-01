import { Map } from 'immutable';
import * as types from '../constants/ActionTypes';

export default function user(state = Map(), action) {
  switch (action.type) {
    case types.RECEIVE_AUTHED_USER:
      if (action.status === 'success') {
        return state.set('info', Map(action.userInfo));
      }
      return state;
    default:
      return state;
  }
}
