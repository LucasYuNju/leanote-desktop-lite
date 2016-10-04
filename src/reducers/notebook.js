import * as types from '../constants/ActionTypes';

const initialState = {
  item: [],
  selected: null,
}

export default function notebooks(state = [], action) {
  switch (action.type) {
    case types.RECEIVE_NOTEBOOKS:
      if (action.response) {
        return action.response;
      }
    default:
      return state;
  }
}
