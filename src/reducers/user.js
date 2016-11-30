import * as types from '../constants/ActionTypes';

export default function user(state = {}, action) {
  switch (action.type) {
    case types.UPDATE_USER:
      return {
        ...state,
        id: action.user.userId,
      }
    default:
      return state;
  }
}
