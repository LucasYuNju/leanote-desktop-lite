import { arrayOf } from 'normalizr';

import { fetchNotes, selectNote } from '../actions/NoteActions';
import { notebookSchema } from '../constants/Schemas';
import * as types from '../constants/ActionTypes';

export function fetchOutdatedNotebooks() {
  return async (dispatch, getState) => {
    const notebooks = {};
    while (true) {
      // action GET_OUTDATED_NOTEBOOKS_SUCCESS gives user reducer a chance to update usn
      const action = await dispatch({
        types: [null, types.GET_NOTEBOOKS_SUCCESS, null],
        url: 'notebook/getSyncNotebooks',
        params: {
          afterUsn: getState().user.localUsn.notebook,
          maxEntry: 20,
        },
        schema: arrayOf(notebookSchema),
      });
      Object.assign(notebooks, action.payload.entities.notebooks);
      if (action.payload.result.length === 0) {
        break;
      }
    }
    buildNotebookTree(notebooks);
    return dispatch({
      type: types.BATCH_SET_NOTEBOOKS,
      payload: {
        entities: {
          notebooks,
        },
      },
    });
  }
}

export function addNote(notebookId, noteId) {
  return { type: types.ADD_NOTE, notebookId, noteId };
}

// In the received data, each notebook has a pointer to its parent.
function buildNotebookTree(notebooks) {
  const ids = Object.keys(notebooks);
  for (let id of ids) {
    notebooks[id].subs = [];
  }
  for (let id of ids) {
    const parentId = notebooks[id].parentNotebookId;
    if (parentId) {
      notebooks[parentId].subs.push(id);
    }
  }
}
