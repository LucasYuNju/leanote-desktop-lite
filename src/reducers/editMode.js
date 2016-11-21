import * as types from '../constants/ActionTypes';

export default function editMode(state = {}, action) {
  switch (action.type) {
		case types.TOGGLE_EDIT_MODE:
			let editMode = true;
			if (state[action.noteId] && state[action.noteId] === true) {
				editMode = false;
			}
			return {
				...state,
				[action.noteId]: editMode,
			}
    default:
      return state;
  }
}
