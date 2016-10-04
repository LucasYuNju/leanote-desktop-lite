import * as types from '../constants/ActionTypes';

export default function notebooks(state = [], action) {
  switch (action.type) {
    case types.REQUEST_NOTEBOOKS:
      if (action.response) {
        return action.response;
      }
    default:
      return state;
  }
}
