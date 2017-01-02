import { arrayOf } from 'normalizr';

import { getThumbnail, getAbstract } from '../util/regex';
import { noteSchema } from '../constants/Schemas';
import * as types from '../constants/ActionTypes';
import { selectNote } from './RouterActions';

export function toggleEditMode(noteId) {
	return { type: types.TOGGLE_EDIT_MODE, noteId };
}

export function fetchOutdatedNotes() {
  return async (dispatch, getState) => {
    while (true) {
      const action = await dispatch({
        types: [null, types.GET_NOTES_SUCCESS, null],
        url: 'note/getSyncNotes',
        query: {
          afterUsn: getState().user.localUsn.note,
          maxEntry: 50,
        },
        schema: arrayOf(noteSchema),
      });
      // Dispatch all networks at the same time will cause 404 error.
      action.payload.result
        .map(noteId => action.payload.entities.notes[noteId])
        .filter(note => !note.isDeleted && !note.isTrash)
        .reduce((promise, note) => {
          return promise.then(() => {
            return dispatch(fetchNoteAndContent(note.noteId));
          });
        }, Promise.resolve());
      if (action.payload.result.length === 0) {
        break;
      }
    }
  }
}

export function fetchNoteAndContent(noteId) {
  return (dispatch, getState) => {
		return dispatch({
			types: [ null, null, types.GET_NOTE_CONTENT_FAILURE ],
			url: 'note/getNoteAndContent',
			query: {
				noteId,
			},
			schema: noteSchema,
		}).then(action => {
      const note = action.payload.entities.notes[action.payload.result];
      note.thumbnail = getThumbnail(note.content);
      note.abstract = getAbstract(note.content);
      dispatch({ type: types.GET_NOTE_CONTENT_SUCCESS, payload: action.payload });
    });
	}
}

export function createNote(note, notebookId) {
  const now = new Date().toString();
  note.createdTime = now;
  note.updatedTime = now;
  return (dispatch) => {
    dispatch({ type: types.ADD_NOTE, payload: { note, notebookId } });
    dispatch(selectNote(note.noteId));
    dispatch({
      types: [types.ADD_NOTE_REQUEST, types.ADD_NOTE_SUCCESS, null],
      url: 'note/addNote',
      method: 'POST',
      body: note,
      schema: noteSchema,
    });
  }
}

/**
 * param change: changed part of note object, only NoteId is required
 */
export function updateNote(note) {
  return (dispatch) => {
    // optimistic update
    dispatch({ type: types.UPDATE_NOTE, payload: { note } });
    dispatch({
      types: [types.UPDATE_NOTE_REQUEST, types.UPDATE_NOTE_SUCCESS, null],
      url: 'note/updateNote',
      method: 'POST',
      body: note,
      schema: noteSchema,
    });
  }
}

// 并没有真的删除，只是在本地设置isTrash属性
// TODO：usn需要更新
// 视图层必须先选中下一个笔记，才能删除目标笔记
export function deleteNote(note) {
  return (dispatch) => {
    dispatch(updateNote({
      ...note,
      isTrash: true,
    }));
  }
}

export function selectMultipleNotes(noteIds) {
  return { type: types.SELECT_MULTIPLE_NOTES, payload: { noteIds } };
}

export function sortNoteList(key) {
  return { type: types.SORT_NOTE_LIST, key };
}
