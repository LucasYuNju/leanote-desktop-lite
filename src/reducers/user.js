import * as types from '../constants/ActionTypes';

export default function user(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_AUTHED_USER:
      if (action.status === 'success') {
        return {
          ...state,
          info: action.userInfo,
        }
      }
      return state;
    default:
      return state;
  }
}
