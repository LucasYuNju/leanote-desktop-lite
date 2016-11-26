import * as types from '../constants/ActionTypes';
import { updateNote } from '../actions/NoteActions';

export function addNoteTag(noteId, tag) {
	return (dispatch, getState) => {
		dispatch({ type: types.LINK_TAG, noteId, tag });
		dispatch(updateNote(getState().entities.notes.byId[noteId]));
	}
}

export function removeNoteTag(noteId, tag) {
	return (dispatch, getState) => {
		dispatch({ type: types.UNLINK_TAG, noteId, tag });
		dispatch(updateNote(getState().entities.notes.byId[noteId]));
	}
}

export function addTag(tag) {

}

export function removeTag(tag) {

}
