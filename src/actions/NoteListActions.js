import { arrayOf } from 'normalizr';
import { camelizeKeys, pascalizeKeys } from 'humps';

import { constructUrl, destructUrl } from '../util/RouteUtil';
import { fetchNotes, selectNote } from '../actions/NoteActions';
import { navigateTo } from '../actions/NavigatorActions';
import { notebookSchema } from '../constants/Schemas';
import * as types from '../constants/ActionTypes';
import { CALL_API } from '../middleware/api';

export function receiveNotebooks(status, entities, rootIds) {
  return { type: types.RECEIVE_NOTEBOOKS, status, entities, rootIds };
}

export function fetchNotebooks() {
	return (dispatch) => {
		return dispatch({
			[CALL_API]: {
				types: [ 'FETCH_NOTEBOOKS_REQUEST', 'FETCH_NOTEBOOKS_SUCCESS', 'FETCH_NOTEBOOKS_FAILURE' ],
				endpoint: `notebook/getNotebooks`,
				schema: arrayOf(notebookSchema)
			}
		}).then((result) => {
			const rootNotebookIds = [];
			const notebooks = result.response.entities.notebooks;
			// Construct notebook tree
			for (let notebookId in notebooks) {
				const parentNotebookId = notebooks[notebookId].parentNotebookId;
				if (!parentNotebookId) {
					rootNotebookIds.push(notebookId);
				}
				else {
					notebooks[parentNotebookId].subs = [...notebooks[parentNotebookId].subs, notebookId];
				}
			}
			dispatch(receiveNotebooks('success', notebooks, rootNotebookIds));
			return result;
		});
	};
}

export function addNote(notebookId, noteId) {
  return { type: types.ADD_NOTE, notebookId, noteId };
}
