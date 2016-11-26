import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';
import merge from 'lodash/merge';
import union from 'lodash/union';

const initialNotes = {
  searchIds: [],
  starredIds: [],
  byId: {},
}
function notes(state = initialNotes, action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.note.noteId]: action.note,
        }
      };
		case types.LINK_TAG:
			return {
				...state,
				byId: {
					...state.byId,
					[action.noteId]: {
						...state.byId[action.noteId],
						tags: [...state.byId[action.noteId].tags, action.tag],
					}
				}
			};
		case types.UNLINK_TAG:
			let deletedIndex = state.byId[action.noteId].tags.indexOf(action.tag);
			return {
				...state,
				byId: {
					...state.byId,
					[action.noteId]: {
						...state.byId[action.noteId],
						tags: [
							...state.byId[action.noteId].tags.slice(0, deletedIndex),
							...state.byId[action.noteId].tags.slice(deletedIndex + 1),
						],
					}
				}
			}
    case types.RECEIVE_NOTES:
      return {
				...state,
        byId: {
					...state.byId,
					...action.entities,
				},
      }
    case types.UPDATE_NOTE_SUCCEEDED:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.note.noteId]: action.note,
        }
      };
    default:
      return state;
  }
}

const initialNotebooks = {
  rootIds: [],
  byId: {},
};
function notebooks(state = initialNotebooks, action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.notebookId]: {
            ...state.byId[action.notebookId],
            noteIds: [
              action.note.noteId,
              ...state.byId[action.notebookId].noteIds,
            ],
          }
        }
      }
    case types.RECEIVE_NOTES:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.notebookId]: {
            ...state.byId[action.notebookId],
            noteIds: action.ids,
          }
        }
      }
    case types.RECEIVE_NOTEBOOKS:
      return {
        rootIds: action.rootIds,
        byId: action.entities,
      };
    default:
      return state;
  }
}


const initialTags={
	allIds: [],
  byId: {},
}
function tags(state = initialTags, action) {
  switch (action.type) {
		case types.ADD_TAG:
			return {
				allIds: [...state.allIds, action.tag],
				byId: {
					...state.byId,
					[action.tag]: {
						tag: action.tag,
						noteIds: [],
					},
				}
			}
		case types.REMOVE_TAG:
			let byId = {
				...state.byId,
			};
			delete byId[action.tag];
			return {
				...state,
				byId,
			}
    case types.RECEIVE_NOTES:
      const ret = {
				allIds: [...state.allIds],
        byId: {
          ...state.byId,
        },
      }
      const notes = Object.keys(action.entities).forEach(noteId => {
        const note = action.entities[noteId];
        if (note.tags) {
          note.tags.forEach(tag => {
            if (tag) {
              if (!ret.byId[tag]) {
								ret.allIds.push(tag);
                ret.byId[tag] = {
                  tag,
                  noteIds: [],
                };
              }
							ret.byId[tag].noteIds = union(ret.byId[tag].noteIds, [note.noteId]);
            }
          });
        }
      });
      return ret;
    default:
      return state;
  }
}

function users(state = { byId: {} }, action) {
  switch (action.type) {
    case types.RECEIVE_AUTHED_USER:
      if (action.status === 'success') {
        return {
          ...state,
          byId: {
            ...state.byId,
            [action.user.userId]: action.user,
          }
        }
      }
      return state;
    default:
      return state;
  }
}

const initialNoteLists = {
  byId: {
    latest: { noteIds: [] },
    searchResult: { noteIds: [] },
  }
}
function generatedNoteLists(state = initialNoteLists, action) {
  switch(action.type) {
    case types.UPDATE_NOTE_REQUESTED:
			const noteIds = union(state.byId.latest.noteIds.slice(0, 9), [action.note.noteId]);
			return {
				byId: {
					...state.byId,
					latest: {
						noteIds,
					}
				}
			}
    default:
      return state;
  }
}

export default combineReducers({
  generatedNoteLists,
  notes,
  notebooks,
  tags,
  users,
});
