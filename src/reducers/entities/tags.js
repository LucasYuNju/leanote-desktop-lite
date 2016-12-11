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
					noteIds: [],
				},
			}
		case types.REMOVE_TAG:
			nextState = {
				...state,
			};
			delete nextState[action.tag];
			return nextState;
    case types.GET_NOTES_SUCCESS:
      nextState = {
				...state,
      }
			for (let noteId of action.payload.result) {
        const note = action.payload.entities.notes[noteId];
        note.tags.filter(tag => tag)
					.forEach(tag => {
	          if (!nextState[tag]) {
	            nextState[tag] = { tag, noteIds: []};
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
