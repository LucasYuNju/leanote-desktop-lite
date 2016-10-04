import * as types from '../constants/ActionTypes';

export function receiveNotebooks(status, value) {
  return { type: types.RECEIVE_NOTEBOOKS, status, response: value };
}

export function fetchNotebooks() {
  return (dispatch) => {
    service.notebook.getNotebooks((res) => {
      dispatch(receiveNotebooks('success', res));
    });
  };
}
