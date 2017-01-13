import * as types from '../constants/ActionTypes';
import { updateNote } from '../actions/NoteActions';

export function addNoteTag(noteId, tag) {
	return (dispatch, getState) => {
		dispatch({ type: types.LINK_TAG, noteId, tag });
    console.log('####', tag);
    console.log(getState().entities.notes[noteId]);
		dispatch(updateNote(getState().entities.notes[noteId]));
	}
}

export function removeNoteTag(noteId, tag) {
	return (dispatch, getState) => {
		dispatch({ type: types.UNLINK_TAG, noteId, tag });
		dispatch(updateNote(getState().entities.notes[noteId]));
	}
}

export function addTag(tag) {
	return { type: types.ADD_TAG, tag };
}

export function removeTag(tag) {
	return { type: types.REMOVE_TAG, tag };
}
