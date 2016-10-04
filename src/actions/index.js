import * as types from '../constants/ActionTypes';
/*
 * action creaters
 */

export function requestLogin(username, password, host) {
  return { type: types.REQUEST_LOGIN, username, password, host };
}

export function receiveLogin(status, userInfo) {
  return { type: types.REQUEST_LOGIN, status, userInfo };
}

export function login(account, password, host) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(requestLogin());
      service.user.login(account, password, host, (ret) => {
        service.user.init((userInfo) => {
          if (userInfo) {
            dispatch(receiveLogin('success', userInfo));
            resolve();
          }
          else {
            dispatch(receiveLogin('error'));
            reject();
          }
        });
      });
    });
  }
}

export function selectNote(value) {
  return { type: types.SELECT_NOTE, value };
}

export function selectNotebook(value) {
  return { type: types.SELECT_NOTEBOOK, value };
}

// not used
export function requestNotebooks() {
  return { type: types.REQUEST_NOTEBOOKS };
}

export function receiveNotebooks(status, value) {
  return { type: types.REQUEST_NOTEBOOKS, status, response: value };
}

export function initNotebooks() {
  return (dispatch) => {
    dispatch(requestNotebooks());
    service.notebook.getNotebooks((res) => {
      dispatch(receiveNotebooks('success', res));
    });
  };
}
