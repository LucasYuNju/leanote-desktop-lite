import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { AUTH_REQUEST } from '../constants/ActionTypes';
import { REHYDRATE } from 'redux-persist/constants';

const API_ROOT = 'https://leanote.com/api/';
let token = '';

// Fetches an API response and normalizes the result JSON according to schema.
function callApi(url, options, schema) {
  return fetch(API_ROOT + url, options)
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
    token = store.getState().user.token;
  }
  if (action.type === REHYDRATE) {
    // REHYDRATE triggers other actions, so token is supposed to be initialized after next() return.
    const result = next(action);
    if (!token) {
      require('electron').ipcRenderer.send('auth-requested');
    }
    return result;
  }

	if (!action.types || !action.url) {
		return next(action);
	}

  let { schema, types, query, url, method = 'GET', body } = action;
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  const [ LOADING, SUCCESS, ERROR ] = types;
  if (!token && LOADING !== AUTH_REQUEST) {
    throw new Error('Token has not been initialized');
  }
  LOADING && next({
		type: LOADING,
	});
  return callApi(`${url}?${qs(query)}`, { method, body: JSON.stringify(body) }, schema)
		.then(
			(response) => {
				const finalAction = {
					type: SUCCESS,
					payload: {
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

function qs(query = {}) {
  query.token = token;
  const esc = encodeURIComponent;
  return Object.keys(query)
    .map(k => esc(k) + '=' + esc(query[k]))
    .join('&');
}
