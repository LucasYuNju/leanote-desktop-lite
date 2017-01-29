import merge from 'lodash/merge';
import union from 'lodash/union';

import * as types from '../../constants/ActionTypes';

function notes(state = {}, action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return {
        ...state,
				[action.payload.note.noteId]: action.payload.note,
      };
		case types.LINK_TAG:
			return {
				...state,
				[action.payload.noteId]: {
					...state[action.payload.noteId],
					tags: [...state[action.payload.noteId].tags, action.payload.tag],
				}
			};
		case types.UNLINK_TAG:
			const deleted = state[action.payload.noteId].tags.indexOf(action.payload.tag);
			return {
				...state,
				[action.payload.noteId]: {
					...state[action.payload.noteId],
					tags: [
						...state[action.payload.noteId].tags.slice(0, deleted),
						...state[action.payload.noteId].tags.slice(deleted + 1),
					],
				}
			};
		case types.GET_NOTE_CONTENT_SUCCESS:
    case types.GET_NOTES_SUCCESS:
      const notes = { ...action.payload.entities.notes };
			// default value of note.tags is null, normalizr wont override it.
      for (let noteId in notes) {
				if (!notes[noteId].tags) {
					notes[noteId].tags = [];
				}
        // remove deleted note
        if (notes[noteId].isDeleted || notes[noteId].isTrash) {
          delete notes[noteId];
        }
			};
      return {
				...state,
				...notes,
      };
    case types.UPDATE_NOTE:
      return {
        ...state,
        [action.payload.noteId]: {
          ...state[action.payload.noteId],
          ...action.payload.note,
        },
      }
    case types.ADD_NOTE_SUCCESS:
    case types.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
				[action.payload.result]: {
          ...state[action.payload.result],
          ...action.payload.entities.notes[action.payload.result]
        },
      };
    default:
      return state;
  }
}

export default notes;
