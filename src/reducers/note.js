import * as types from '../constants/ActionTypes';

const initialState = {
  selected: null,
}

export default function note(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_NOTE_SUCCEEDED:
      const note = state[action.note.NoteId]
      const mergedNote = {
        ...note,
        ...action.note,
      }
      return {
        ...state,
        [mergedNote.NoteId]: mergedNote,
      };
    case types.SELECT_NOTE:
      return {
        ...state,
        selected: action.noteId,
      };
      return state;
    default:
      return state;
  }
}
