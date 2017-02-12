import { fetchOutdatedNotes } from '../actions/NoteActions';
import { fetchOutdatedNotebooks } from '../actions/NotebookActions';
import { getLastUsn } from '../actions/UserActions';
import * as types from '../constants/ActionTypes';
import { noteSchema } from '../constants/Schemas';

export function syncIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(getLastUsn())
      .then(() => {
        const { user } = getState();
        const localUsn = Math.max(user.localUsn.note, user.localUsn.notebook);
        if (localUsn < user.remoteUsn) {
          return dispatch(pull());
        }
        if (localUsn > user.remoteUsn) {
          return dispatch(push());
        }
      });
  }
}

export function pull(localUsn) {
  return (dispatch) => {
    return dispatch(fetchOutdatedNotebooks()).then(() => {
      return dispatch(fetchOutdatedNotes());
    });
  }
}

/*
 * 将需要push的笔记，按照usn排序，依次push
 * 之后push新创建的笔记
 */
export function push() {
  return (dispatch, getState) => {
    const { entities, user } = getState();
    const notes = [];
    for (let noteId in entities.notes) {
      notes.push(entities.notes[noteId]);
    }
    return notes
      .filter(note => !note.isNew && note.isDirty)
      .map(note => {
        console.log('post dirty note', note.noteId, note.usn);
        return dispatch({
          types: [types.UPDATE_NOTE_REQUEST, null, null],
          url: 'note/updateNote',
          method: 'POST',
          body: { ...note },
          schema: noteSchema,
        })
        .then(action => {
          // post返回的note中，content和abstract为空，需要手动删除,
          const note = action.payload.entities.notes[action.payload.result];
          delete note.abstract;
          delete note.content;
          note.isDirty = false;
          dispatch({ type: types.UPDATE_NOTE_SUCCESS, payload: action.payload });
        });
      })
      // reduce()
  }
}
