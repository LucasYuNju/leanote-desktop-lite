import * as types from '../constants/ActionTypes';

const initialState = {
  order: {
    key: 'updatedTime',
    ascending: false,
  }
};

export default function noteList(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_NOTE_LIST:
      if (action.noteListId) {
        return {
          ...state,
          type: action.noteListType,
          id: action.noteListId,
        }
      }
      return state;
    case types.SORT_NOTE_LIST:
      return {
        ...state,
        order: {
          key: action.key,
          ascending: state.order.key === action.key ? !state.order.ascending : false,
        }
      }
      return state;
    default:
      return state;
  }
}
