import * as types from '../constants/ActionTypes';

export default function user(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_AUTHED_USER:
      if (action.status === 'success') {
        return {
          ...state,
          id: action.user.userId,
        }
      }
      return state;
    default:
      return state;
  }
}
