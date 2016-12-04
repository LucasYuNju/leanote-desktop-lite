import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { AUTH_REQUEST } from '../constants/ActionTypes';
import { REHYDRATE } from 'redux-persist/constants';

const API_ROOT = 'https://leanote.com/api/';
let token = '';

const initTokenIfNeeded = ({ dispatch, getState }) => {
  if (!token) {
    const { entities, user } = getState();
    if (user.id && entities.users[user.id]) {
      token = entities.users[user.id].token;
    }
  }
}

// Fetches an API response and normalizes the result JSON according to schema.
const callApi = (endpoint, schema) => {
  return fetch(API_ROOT + endpoint)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        const camelizedJson = camelizeKeys(json)
				if (schema) {
					return normalize(camelizedJson, schema);
				}
				return camelizedJson;
      })
    );
}

// A Redux middleware that interprets actions with url and types info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  if (!token) {
    initTokenIfNeeded(store);
  }
  if (action.type === REHYDRATE) {
    // REHYDRATE will trigger other actions, so token is supposed to be ready after calling next.
    const result = next(action);
    if (!token) {
      require('electron').ipcRenderer.send('auth-requested');
    }
    return result;
  }

	if (!action.types || !action.url) {
		return next(action);
	}

  let { schema, types, params, url } = action;
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  const [ LOADING, SUCCESS, ERROR ] = types;
  if (!token && LOADING !== AUTH_REQUEST) {
    throw new Error('Token has not been initialized');
  }
  LOADING && next({
		type: LOADING,
		payload: {
			...action,
		},
	});
  return callApi(url + queryString(params), schema)
		.then(
			(response) => {
				const finalAction = {
					type: SUCCESS,
					payload: {
						...action,
						...response,
					},
				}
				return SUCCESS ? next(finalAction) : finalAction;
			},
	    (error) => {
				const finalAction = {
					type: ERROR,
					meta: {
						error,
					},
					error: true,
				};
				return ERROR ? next(ERROR) : finalAction;
			}
		);
}

function queryString(query = {}) {
	let res = '?';
	query.token = token;
	for (let key in query) {
		res += `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}&`;
	}
	return res;
}
