import merge from 'lodash/merge';
import union from 'lodash/union';
import remove from 'lodash/remove';

import * as types from '../../constants/ActionTypes';

function notebooks (state = {}, action) {
  switch (action.type) {
    // FIXME: duplicate action reducer
    case types.ADD_NOTE:
      return {
        ...state,
        [action.payload.notebookId]: {
          ...state[action.payload.notebookId],
          noteIds: [
            action.payload.note.noteId,
            ...state[action.payload.notebookId].noteIds,
          ],
        }
      };
    case types.REMOVE_FROM_NOTEBOOK:
      const index = state[action.payload.notebookId].noteIds.indexOf(action.payload.noteId);
      return {
        ...state,
        [action.payload.notebookId]: {
          ...state[action.payload.notebookId],
          noteIds: [
            ...state[action.payload.notebookId].noteIds.slice(0, index),
            ...state[action.payload.notebookId].noteIds.slice(index + 1)
          ],
        }
      };
    case types.ADD_TO_NOTEBOOK:
      return {
        ...state,
        [action.payload.notebookId]: {
          ...state[action.payload.notebookId],
          noteIds: [
            ...state[action.payload.notebookId].noteIds,
            action.payload.noteId,
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
        if (note.isTrash || note.isDeleted || !state[note.notebookId]) continue;
        state = {
          ...state,
          [note.notebookId]: {
            ...state[note.notebookId],
            noteIds: union(state[note.notebookId].noteIds, [noteId]),
          }
        };
      }
      return state;
    case types.BATCH_SET_NOTEBOOKS:
      return {
        ...action.payload.entities.notebooks,
      };
    default:
      return state;
  }
}

export default notebooks;
