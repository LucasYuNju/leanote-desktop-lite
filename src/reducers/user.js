import * as types from '../constants/ActionTypes';

export default function user(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_AUTHED_USER:
      if (action.status) {
        if (action.status === 'success') {
          return Object.assign({}, state, {
            userInfo: action.userInfo,
          });
        }
        else {
          return state;
        }
      }
    default:
      return state;
  }
}
