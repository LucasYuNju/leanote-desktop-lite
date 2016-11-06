import * as types from '../constants/ActionTypes';

const initialState = {
  selected: null,
};

export default function note(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_NOTE:
      return {
        ...state,
        selected: action.noteId,
      };
    default:
      return state;
  }
}
