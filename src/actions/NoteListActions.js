import { arrayOf } from 'normalizr';

import { fetchNotes, selectNote } from '../actions/NoteActions';
import { notebookSchema } from '../constants/Schemas';
import * as types from '../constants/ActionTypes';

export function fetchNotebooks() {
	return (dispatch) => {
		return dispatch({
			types: [ null, null, types.GET_NOTEBOOKS_FAILURE ],
			url: `notebook/getNotebooks`,
			schema: arrayOf(notebookSchema)
		}).then((result) => {
			// Construct notebook tree
			const notebooks = result.payload.entities.notebooks;
			for (let notebookId in notebooks) {
				const parent = notebooks[notebookId].parentNotebookId;
				if (parent) {
					notebooks[parent].subs = [...notebooks[parent].subs, notebookId];
				}
			}
			dispatch({
				type: types.GET_NOTEBOOKS_SUCCESS,
				payload: result.payload,
			});
			return result;
		});
	};
}

export function addNote(notebookId, noteId) {
  return { type: types.ADD_NOTE, notebookId, noteId };
}
