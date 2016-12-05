import merge from 'lodash/merge';
import union from 'lodash/union';

import * as types from '../../constants/ActionTypes';

const initialNoteLists = {
  latest: [],
  searchResult: { },
}
function generated(state = initialNoteLists, action) {
  switch(action.type) {
    case types.UPDATE_NOTE:
			return {
				...state,
				latest: union(state.latest.slice(0, 9), [action.note.noteId])
			}
    default:
      return state;
  }
}
