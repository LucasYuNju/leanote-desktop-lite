import * as types from '../constants/ActionTypes';

const initialState = {
  selected: null,
}

export default function noteList(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_NOTEBOOK:
      if (action.value) {
        return {
          ...state,
          selected: {
            type: 'notebook',
            id: action.value,
          },
        }
      }
      return state;
    default:
      return state;
  }
}
