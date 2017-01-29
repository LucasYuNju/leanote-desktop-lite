import union from 'lodash/union'
import * as types from '../constants/ActionTypes';
import {updateNote} from '../actions/NoteActions';

/**
 * Leanote有单独的api进行增删tag，目前还没有调用这些api，而是从note中解析出tag
 */

export function addNoteTag(noteId, tag) {
  return (dispatch, getState) => {
    const tags = getState().entities.notes[noteId].tags;
    console.log('####add tag', tag, getState().entities.notes[noteId]);
    dispatch({ type: types.LINK_TAG, payload: { noteId, tag } });
    dispatch(updateNote(noteId, {
      tags: union(tags, [tag])
    }));
  }
}

export function removeNoteTag(noteId, tag) {
  return (dispatch, getState) => {
    let tags = [...(getState().entities.notes[noteId].tags)];
    tags.splice(tags.indexOf(tag), 1);
    dispatch({ type: types.UNLINK_TAG, payload: { noteId, tag } });
    dispatch(updateNote(noteId, {tags}));
  }
}

export function addTag(tag) {
  return { type: types.ADD_TAG, tag };
}

export function removeTag(tag) {
  return { type: types.REMOVE_TAG, tag };
}
