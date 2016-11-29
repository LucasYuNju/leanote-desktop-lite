import { arrayOf, normalize } from 'normalizr';
import { camelizeKeys, pascalizeKeys } from 'humps';

import * as types from '../constants/ActionTypes';
import { CALL_API } from '../middleware/api';

export function receiveAuthedUser(status, user) {
  return { type: types.RECEIVE_AUTHED_USER, status, user };
}

export function autologin() {
  return (dispatch) => {
		return Promise.reject('auto login deprecated');
  }
}

export function fetchInfo(userId) {
	return (dispatch) => {
		return dispatch({
			[CALL_API]: {
				types: [ 'USER_INFO_REQUEST', 'USER_INFO_SUCCESS', 'USER_INFO_FAILURE' ],
				endpoint: `user/info`,
				query: {
					userId,
				},
				options: {
					method: 'GET',
				},
			}
		}).then((result) => {
			dispatch(receiveAuthedUser('success', result.response))
		});
	}
}

export function login(account, password, host) {
	return {
		[CALL_API]: {
			types: [ 'AUTH_REQUEST', 'AUTH_SUCCESS', 'AUTH_FAILURE' ],
			endpoint: `auth/login`,
			query: {
				email: account,
				pwd: password,
			},
			options: {
				method: 'GET',
			},
		}
	};
}
