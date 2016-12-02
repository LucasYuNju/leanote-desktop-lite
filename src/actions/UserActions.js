import { arrayOf, normalize } from 'normalizr';
import { camelizeKeys, pascalizeKeys } from 'humps';

import * as types from '../constants/ActionTypes';
import { setToken } from '../middleware/api';

export function updateUser(user) {
  return { type: types.UPDATE_USER, user };
}

export function autologin() {
  return (dispatch) => {
		return Promise.reject('auto login deprecated');
  }
}

export function fetchInfo(userId) {
	return (dispatch) => {
		return dispatch({
			types: [ types.GET_USER_REQUEST, types.GET_USER_SUCCESS, types.GET_USER_FAILURE ],
			url: `user/info`,
			params: {
				userId,
			},
			options: {
				method: 'GET',
			},
		});
	}
}

export function login(account, password, host) {
	return (dispatch) => {
		return dispatch({
			types: [ types.AUTH_REQUEST, types.AUTH_SUCCESS, types.AUTH_FAILURE ],
			url: `auth/login`,
			params: {
				email: account,
				pwd: password,
			},
			options: {
				method: 'GET',
			},
		})
		.then((result) => {
			setToken(result.payload.token);
		}).catch((reason) => {
			console.log(reason);
		});
	}
}
