import { arrayOf, normalize } from 'normalizr';
import { camelizeKeys, pascalizeKeys } from 'humps';

import * as types from '../constants/ActionTypes';

export function receiveAuthedUser(status, user) {
  return { type: types.RECEIVE_AUTHED_USER, status, user };
}

export function autologin() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      service.user.init((user) => {
        if (user) {
          dispatch(receiveAuthedUser('success', camelizeKeys(user)));
          resolve(camelizeKeys(user));
        }
        else {
          dispatch(receiveAuthedUser('error'));
          reject();
        }
      });
    });
  }
}

export function login(account, password, host) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      service.user.login(account, password, host, (ret) => {
        ret ? resolve() : reject();
      });
    });
  }
}
