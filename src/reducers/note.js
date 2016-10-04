import * as types from '../constants/ActionTypes';

export default function notes(state = [], action) {
  switch (action.type) {
    case types.RECEIVE_NOTES:
      if (action.value.length > 0) {
        const notebookId = action.value[0].notebookId;
        const newNotes = {};
        action.value.forEach(note => {
          newNotes[note.NoteId] = note;
        });
        return Object.assign(newNotes, state);
      }
      return state;
    default:
      return state;
  }
}
