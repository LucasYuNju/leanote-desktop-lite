import { arrayOf, normalize } from 'normalizr';
import { camelizeKeys, pascalizeKeys } from 'humps';

import * as types from '../constants/ActionTypes';

export function updateUser(user) {
  return { type: types.UPDATE_USER, user };
}

export function autologin() {
  return (dispatch) => {
		return Promise.reject('auto login deprecated');
  }
}

// Get avatar
export function fetchInfo(userId) {
	return {
    types: [null, types.GET_USER_SUCCESS, types.GET_USER_FAILURE],
    url: `user/info`,
    query: {
      userId,
    },
  };
}

export function login(account, password, host) {
	return {
    types: [types.AUTH_REQUEST, types.AUTH_SUCCESS, types.AUTH_FAILURE],
    url: `auth/login`,
    query: {
      email: account,
      pwd: password,
    },
  };
}

export function getLastUsn() {
  return {
    types: [null, types.GET_LAST_USN_SUCCESS, null],
    url: 'user/getSyncState',
  };
}
