import merge from 'lodash/merge';
import union from 'lodash/union';

import * as types from '../../constants/ActionTypes';

const initialState = {
  latest: [],
  searchResult: { },
}
function generated(state = initialState, action) {
  switch(action.type) {
    case types.UPDATE_NOTE:
			return {
				...state,
				latest: union(state.latest, [action.payload.note.noteId]).slice(0, 10)
			}
    default:
      return state;
  }
}
