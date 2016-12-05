import * as types from '../constants/ActionTypes';

export default function user(state = {}, action) {
  switch (action.type) {
    case types.AUTH_SUCCESS:
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.UPDATE_USER:
      return {
        ...state,
        ...action.user,
      };
    case types.GET_LAST_USN_SUCCESS:
      return {
        ...state,
        remoteUsn: action.payload.lastSyncUsn,
      }
    default:
      return state;
  }
}
