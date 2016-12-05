import { arrayOf } from 'normalizr';

import { fetchNotes, selectNote } from '../actions/NoteActions';
import { notebookSchema } from '../constants/Schemas';
import * as types from '../constants/ActionTypes';

export function fetchNotebooks() {
	return (dispatch) => {
		// return dispatch({
		// 	types: [ null, null, types.GET_NOTEBOOKS_FAILURE ],
		// 	url: `notebook/getNotebooks`,
		// 	schema: arrayOf(notebookSchema)
		// }).then((result) => {
		// 	const notebooks = result.payload.entities.notebooks;
    //   buildNotebookTree(notebooks);
		// 	dispatch({
		// 		type: types.GET_NOTEBOOKS_SUCCESS,
		// 		payload: result.payload,
		// 	});
		// 	return result;
		// });
	};
}

export function fetchOutdatedNotebooks(afterUsn) {
  return async (dispatch, getState) => {
    const notebooks = {};
    while (true) {
      // GET_OUTDATED_NOTEBOOKS_SUCCESS gives user reducer a chance to update usn
      const action = await dispatch({
        types: [null, 'GET_OUTDATED_NOTEBOOKS_SUCCESS', null],
        url: 'notebook/getSyncNotebooks',
        params: {
          afterUsn: getState().user.localUsn,
          maxEntry: 3,
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
      type: 'GET_NOTEBOOKS_SUCCESS',
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

// By default, each notebook has a pointer to its parent.
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
