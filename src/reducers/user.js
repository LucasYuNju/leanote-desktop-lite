import { REHYDRATE } from 'redux-persist/constants';

import * as types from '../constants/ActionTypes';

const initialState = {
  localUsn: {
    note: 0,
    notebook: 0,
  }
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.GET_NOTES_SUCCESS:
    // case types.POST_NOTE_SUCCESS:
    case types.ADD_NOTE_SUCCESS:
      return {
        ...state,
        localUsn: {
          ...state.localUsn,
          note: Math.max(getMaxUsn(action.payload.entities), state.localUsn.note),
        }
      }
    // TODO 只需要一个localUsn
    case types.UPDATE_NOTE:
      return {
        ...state,
        localUsn: {
          ...state.localUsn,
          note: action.payload.note.usn,
        }
      }
    case types.GET_NOTEBOOKS_SUCCESS:
      if (action.payload.result.length) {
        return {
          ...state,
          localUsn: {
            ...state.localUsn,
            notebook: getMaxUsn(action.payload.entities),
          }
        }
      }
      return state;
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

function getMaxUsn(entities) {
  let usn = 0;
  for (let type in entities) {
    for (let id in entities[type]) {
      usn = Math.max(usn, entities[type][id].usn || 0);
    }
  }
  return usn;
}
