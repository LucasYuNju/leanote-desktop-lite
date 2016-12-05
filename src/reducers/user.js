import * as types from '../constants/ActionTypes';

export default function user(state = {}, action) {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
    case types.AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.UPDATE_USER:
      return {
        ...state,
        ...action.user,
      };
    default:
      return state;
  }
}
