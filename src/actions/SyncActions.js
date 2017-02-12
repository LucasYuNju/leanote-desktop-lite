import { fetchOutdatedNotes } from '../actions/NoteActions';
import { fetchOutdatedNotebooks } from '../actions/NotebookActions';
import { getLastUsn } from '../actions/UserActions';
import * as types from '../constants/ActionTypes';
import { noteSchema } from '../constants/Schemas';

export function syncIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(getLastUsn())
      .then((action) => {
        const remoteUsn = action.payload.lastSyncUsn;
        const localUsn = getState().user.localUsn;
        console.log('last sync usn', remoteUsn);

        const maxLocalUsn = Math.max(localUsn.note, localUsn.notebook, localUsn.tag);
        if (maxLocalUsn < remoteUsn) {
          return dispatch(pull());
        }
        if (maxLocalUsn > remoteUsn) {
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
    const pushDirty = notes
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
        // 如果push失败，笔记仍是dirty，可以下次同步
        .then(action => {
          // post返回的note中，content和abstract为空，需要手动删除,
          const note = action.payload.entities.notes[action.payload.result];
          delete note.abstract;
          delete note.content;
          note.isDirty = false;
          dispatch({ type: types.UPDATE_NOTE_SUCCESS, payload: action.payload });
        });
      })
      .reduce((prev, cur) => prev.then(cur), Promise.resolve());
    // const pushNew = notes
    //   .filter(note => note.isNew)
    //   .map(note => {
    //     console.log('post new note', note.noteId);
    //   });
    return pushDirty;
  }
}
