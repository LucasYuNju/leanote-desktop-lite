import * as types from '../constants/ActionTypes';

export function linkTag(noteId, tag) {
	return { type: types.LINK_TAG };
}

export function unlinkTag(noteId, tag) {
	return { type: types.UNLINK_TAG };
}
