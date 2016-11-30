import { arrayOf, normalize } from 'normalizr';
import { camelizeKeys, pascalizeKeys } from 'humps';

import * as types from '../constants/ActionTypes';
import { CALL_API } from '../middleware/api';

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
			[CALL_API]: {
				types: [ 'FETCH_USER_REQUEST', 'FETCH_USER_SUCCESS', 'FETCH_USER_FAILURE' ],
				endpoint: `user/info`,
				query: {
					userId,
				},
				options: {
					method: 'GET',
				},
			}
		}).then((result) => {
			dispatch(updateUser(result.response))
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
