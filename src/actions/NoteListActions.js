import { arrayOf } from 'normalizr';
import { camelizeKeys, pascalizeKeys } from 'humps';

import { constructUrl, destructUrl } from '../util/RouteUtil';
import { fetchNotes, selectNote } from '../actions/NoteActions';
import { navigateTo } from '../actions/NavigatorActions';
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
				payload: {
					entities: {
						notebooks,
					}
				}
			});
			return result;
		});
	};
}

export function addNote(notebookId, noteId) {
  return { type: types.ADD_NOTE, notebookId, noteId };
}
