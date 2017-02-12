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
    const updated = [];

    for (let noteId in entities.notes) {
      const note = entities.notes[noteId];
      if (!note.isNew && note.usn > user.remoteUsn) {
        updated.push(note);
      }
    }
    return updated
      .sort((a, b) => a.usn - b.usn)
      .map(note => {
        console.log('post note', note.usn);
        return new Promise((resolve, reject) => {
          dispatch({
            types: [types.UPDATE_NOTE_REQUEST, types.UPDATE_NOTE_SUCCESS, null],
            url: 'note/updateNote',
            method: 'POST',
            body: { ...note },
            schema: noteSchema,
          })
          // .then(action => {
          //   // post的返回值中，content和abstract为空，需要手动删除
          //   const note = action.payload.entities.notes[action.payload.result];
          //   delete note.abstract;
          //   delete note.content;
          //   dispatch({ type: types.UPDATE_NOTE_SUCCESS, payload: action.payload });
          // });

        });
      })
      // reduce()
  }
}
