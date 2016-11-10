import * as types from '../constants/ActionTypes';

export default function user(state = null, action) {
  switch (action.type) {
    case types.RECEIVE_AUTHED_USER:
      if (action.status === 'success') {
        return action.user.userId;
      }
      return state;
    default:
      return state;
  }
}
