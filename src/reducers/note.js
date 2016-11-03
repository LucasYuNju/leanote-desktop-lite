import { Map } from 'immutable';
import * as types from '../constants/ActionTypes';

const initialState = Map({
  selected: null,
});

export default function note(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_NOTE:
      return state.set('selected', action.noteId);
      // return {
      //   ...state,
      //   selected: action.noteId,
      // };
    default:
      return state;
  }
}
