import * as types from '../constants/ActionTypes';

export default function user(state = {}, action) {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return {
        ...state,
        id: action.payload.userId,
      }
    default:
      return state;
  }
}
