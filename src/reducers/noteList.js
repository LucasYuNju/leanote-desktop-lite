import * as types from '../constants/ActionTypes';

const initialState = {
  order: {
    key: 'updatedTime',
    ascending: false,
  },
  checked: [],
};

export default function noteList(state = initialState, action) {
  switch (action.type) {
    case types.SORT_NOTE_LIST:
      return {
        ...state,
        order: {
          key: action.key,
          ascending: state.order.key === action.key ? !state.order.ascending : false,
        }
      }
    case types.CHECK_NOTES:
      return {
        ...state,
        checked: action.payload.checked,
      };
    default:
      return state;
  }
}
