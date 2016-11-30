import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';
import merge from 'lodash/merge';
import union from 'lodash/union';

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
    case types.RECEIVE_NOTES:
      return {
				...state,
				...action.entities,
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
    case types.RECEIVE_NOTES:
			// console.log(action, state.byId[action.notebookId].nodeIds, action.ids, union(state.byId[action.notebookId].nodeIds, action.ids));
      return {
        ...state,
				[action.notebookId]: {
					...state[action.notebookId],
					noteIds: union(state[action.notebookId].nodeIds, action.ids),
				}
      }
    case types.RECEIVE_NOTEBOOKS:
      return {
				...action.entities,
      };
    default:
      return state;
  }
}


// const initialTags={
// 	allIds: [],
//   byId: {},
// }
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
			const nextState = {
				...state,
			};
			delete nextState[action.tag];
			return nextState;
    case types.RECEIVE_NOTES:
      const nextSatate = {
				...state,
      }
      Object.keys(action.entities).forEach(noteId => {
        const note = action.entities[noteId];
        note.tags.filter(tag => tag)
					.forEach(tag => {
	          if (!nextSatate[tag]) {
	            nextSatate[tag] = { tag, noteIds: []};
	          }
						nextSatate[tag].noteIds = union(nextSatate[tag].noteIds, [note.noteId]);
	        });
      });
      return nextSatate;
    default:
      return state;
  }
}

function users(state = {}, action) {
  switch (action.type) {
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
