import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import union from 'lodash/union';

import * as types from '../constants/ActionTypes';

function notes(state = {}, action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return {
        ...state,
				[action.note.noteId]: action.note,
      };
		case types.LINK_TAG:
			return {
				...state,
				[action.noteId]: {
					...state[action.noteId],
					tags: [...state[action.noteId].tags, action.tag],
				}
			};
		case types.UNLINK_TAG:
			const deleted = state[action.noteId].tags.indexOf(action.tag);
			return {
				...state,
				[action.noteId]: {
					...state[action.noteId],
					tags: [
						...state[action.noteId].tags.slice(0, deleted),
						...state[action.noteId].tags.slice(deleted + 1),
					],
				}
			};
		case types.GET_NOTE_CONTENT_SUCCESS:
    case types.GET_NOTES_SUCCESS:
			// default value of note.tags is null, normalizr wont override it.
			Object.keys(action.payload.entities.notes).forEach(noteId => {
				if (!action.payload.entities.notes[noteId].tags) {
					action.payload.entities.notes[noteId].tags = [];
				}
			});
      return {
				...state,
				...action.payload.entities.notes,
      };
    case types.UPDATE_NOTE_SUCCEEDED:
			// TODO DELETE
      return {
        ...state,
				[action.note.noteId]: action.note,
      };
    default:
      return state;
  }
}

function notebooks(state = {}, action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return {
        ...state,
				[action.notebookId]: {
					...state[action.notebookId],
					noteIds: [
						...state[action.notebookId].noteIds,
						action.note.noteId,
					],
				}
      };
    case types.GET_NOTES_REQUEST:
      return {
        ...state,
        [action.payload.notebookId]: {
          ...state[action.payload.notebookId],
          fetched: true,
        }
      };
    case types.GET_NOTES_SUCCESS:
      return {
        ...state,
				[action.payload.notebookId]: {
					...state[action.payload.notebookId],
					noteIds: union(state[action.payload.notebookId].noteIds, action.payload.result),
				}
      }
    case types.GET_NOTEBOOKS_SUCCESS:
      return {
				...action.payload.entities.notebooks,
      };
    default:
      return state;
  }
}


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

function users(state = {}, action) {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
		case types.AUTH_SUCCESS:
      return {
        ...state,
        [action.payload.userId]: {
          ...state[action.payload.userId],
          ...action.payload,
        },
      };
    case types.UPDATE_USER:
      return {
        ...state,
        [action.user.userId]: action.user,
      }
    default:
      return state;
  }
}

const initialNoteLists = {
  latest: [],
  searchResult: { },
}
function generated(state = initialNoteLists, action) {
  switch(action.type) {
    case types.UPDATE_NOTE:
			return {
				...state,
				latest: union(state.latest.slice(0, 9), [action.note.noteId])
			}
    default:
      return state;
  }
}

export default combineReducers({
  generated,
  notes,
  notebooks,
  tags,
  users,
});
