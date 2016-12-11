import merge from 'lodash/merge';
import union from 'lodash/union';

import * as types from '../../constants/ActionTypes';

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
      for (let noteId in action.payload.entities.notes) {
        const note = action.payload.entities.notes[noteId];
        state = {
          ...state,
          [note.notebookId]: {
            ...state[note.notebookId],
            noteIds: union(state[note.notebookId].noteIds, [noteId]),
          }
        };
      }
      return state;
    case types.GET_NOTEBOOKS_SUCCESS:
      return {
				...action.payload.entities.notebooks,
      };
    default:
      return state;
  }
}

export default notebooks;
