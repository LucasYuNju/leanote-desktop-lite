import merge from 'lodash/merge';
import union from 'lodash/union';

import * as types from '../../constants/ActionTypes';

function tags(state = {}, action) {
  let nextState = null;
  switch (action.type) {
    case types.ADD_TAG:
      return {
        ...state,
        [action.tag]: {
          tag: action.tag,
          noteIds: []
        }
      }
    case types.LINK_TAG:
      return {
        ...state,
        [action.payload.tag]: {
          ...state[action.payload.tag],
          noteIds: union(state[action.payload.tag].noteIds, [action.payload.noteId]),
        }
      }
    case types.REMOVE_TAG:
      nextState = {
        ...state
      };
      delete nextState[action.tag];
      return nextState;
    case types.UNLINK_TAG:
      const index = state[action.payload.tag].noteIds.indexOf(action.payload.noteId);
      return {
        ...state,
        [action.payload.tag]: {
          ...state[action.payload.tag],
          noteIds: [
            ...state[action.payload.tag].noteIds.slice(0, index),
            ...state[action.payload.tag].noteIds.slice(index + 1),
          ]
        }
      }
    case types.GET_NOTES_SUCCESS:
      nextState = {
        ...state
      }
      for (let noteId in action.payload.entities.notes) {
        const note = action.payload.entities.notes[noteId];
        if (!note || note.isTrash || note.isDeleted)
          continue;
        note.tags.filter(tag => tag).forEach(tag => {
          if (!nextState[tag]) {
            nextState[tag] = {
              tag,
              noteIds: []
            };
          }
          nextState[tag].noteIds = union(nextState[tag].noteIds, [note.noteId]);
        });
      };
      return nextState;
    default:
      return state;
  }
}

export default tags;
