import * as types from '../constants/ActionTypes';

const initialState = {
  id: null,
};

export default function note(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_NOTE:
      return {
        ...state,
        id: action.noteId,
      };
    default:
      return state;
  }
}
