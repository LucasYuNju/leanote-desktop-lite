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

/**
 * note创建时指定了noteId a，服务器会为note指定一个新的noteId b
 * 这里令entities.notes[a].noteId = b。
 * 在新建的note脱离选中状态时，令entities.notes[b] = entities.notes[a]; delete entities.notes[a]
 */
 // TODO 另一种写法，只有新笔记脱离焦点的时候才会创建和更新
export function postNoteIfNecessary(note) {
  return (dispatch, getState) => {
    if (note.isNew) {
      dispatch({
        types: [types.ADD_NOTE_REQUEST, null, null],
        url: 'note/addNote',
        method: 'POST',
        body: note,
        schema: noteSchema,
      }).then(action => {
        const serverSideId = action.payload.result;
        // TODO 应该从state中移除
        const actions = [
          { type: types.UPDATE_NOTE, payload: { noteId: note.noteId, note: { isTrash: true, isNew: false } } },
          { type: types.ADD_NOTE, payload: { note: {
            ...note,
            noteId: serverSideId,
            aliasId: note.noteId,
            isNew: false,
            usn: action.entities.notes[serverSideId].usn
          }, notebookId: note.notebookId } }
        ];
        dispatch({ type: types.BATCH_ACTIONS, actions });
      });
    }
  }
}

export function createNote(note) {
  const now = new Date().toString();
  note.createdTime = now;
  note.updatedTime = now;
  return (dispatch, getState) => {
    note.isNew = true;
    dispatch({ type: types.ADD_NOTE, payload: { note, notebookId: note.notebookId } });
    // TODO FIXME related with react css transition group
    setTimeout(() => {
      dispatch(selectNote(note.noteId));
    }, 250);
  }
}

/**
 * param change: changed part of note object, only NoteId is required
 */
export function updateNote(noteId, attributes) {
  return (dispatch, getState) => {
    const note = getState().entities.notes[noteId];
    // optimistic update
    dispatch({ type: types.UPDATE_NOTE, payload: { noteId, note: { ...attributes } } });
    if (!note.isNew) {
      dispatch({
        types: [types.UPDATE_NOTE_REQUEST, null, null],
        url: 'note/updateNote',
        method: 'POST',
        body: { ...note, ...attributes },
        schema: noteSchema,
      }).then(action => {
        // post的返回值中，content和abstract为空，需要手动删除
        const note = action.payload.entities.notes[action.payload.result];
        delete note.abstract;
        delete note.content;
        dispatch({ type: types.UPDATE_NOTE_SUCCESS, payload: action.payload });
      });
    }
  }
}

/**
 * 视图层必须先选中下一个笔记，才能删除笔记
 * 并没有真的删除，只是在本地设置isTrash属性
 */
export function deleteNote(note) {
  return (dispatch) => {
    dispatch(updateNote(note.noteId, { isTrash: true }));
  }
}

export function checkNotes(checked) {
  return (dispatch, getState) => {
    dispatch({ type: types.CHECK_NOTES, payload: { checked } });
  }
}

export function sortNoteList(key) {
  return { type: types.SORT_NOTE_LIST, key };
}
