import * as types from '../constants/ActionTypes';

export function receiveLogin(status, userInfo) {
  return { type: types.REQUEST_LOGIN, status, userInfo };
}

export function login(account, password, host) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
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
