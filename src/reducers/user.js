import { REHYDRATE } from 'redux-persist/constants';

import * as types from '../constants/ActionTypes';

const initialState = {
  localUsn: 0,
}

export default function user(state = initialState, action) {
  let localUsn = state.localUsn;
  if (action.type !== REHYDRATE && action.payload && action.payload.entities) {
    for (let type in action.payload.entities) {
      for (let id in action.payload.entities[type]) {
        localUsn = Math.max(localUsn, action.payload.entities[type][id].usn || localUsn);
      }
    }
    return {
      ...state,
      localUsn,
    }
  }
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
