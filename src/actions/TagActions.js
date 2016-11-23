import * as types from '../constants/ActionTypes';

export function createTag(tag) {

}

export function linkTag(noteId, tag) {
	return { type: types.LINK_TAG, noteId, tag };
}

export function unlinkTag(noteId, tag) {
	return { type: types.UNLINK_TAG, noteId, tag };
}
