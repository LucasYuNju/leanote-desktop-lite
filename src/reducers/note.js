import * as types from '../constants/ActionTypes';

export function notes(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_NOTES:
      if (action.value.length > 0) {
        const notebookId = action.value[0].notebookId;
        const newNotes = {};
        action.value.forEach(note => {
          newNotes[note.NoteId] = note;
        });
        return {
          ...newNotes,
          ...state,
        }
      }
      return state;
    case types.UPDATE_NOTE_SUCCEEDED:
      const note = state[action.note.NoteId]
      const mergedNote = {
        ...note,
        ...action.note,
      }
      return {
        ...state,
        [mergedNote.NoteId]: mergedNote,
      }
    default:
      return state;
  }
}

export function selectedNoteId(state = null, action) {
  switch (action.type) {
    case types.SELECT_NOTE:
      if (action.value) {
        return action.value;
      }
    default:
      return state;
  }
}
