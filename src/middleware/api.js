import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

const API_ROOT = 'https://leanote.com/api/'
let token = '';

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
    )
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, query } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }
	endpoint += queryString(query);

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema)
		.then(
			response => {
				if (response.token) {
					token = response.token;
				}
				console.log('api', endpoint, response);
				return response;
			}, error => {
				console.error('error', error);
			})
		.then(
	    response => next(actionWith({
	      response,
	      type: successType
	    })),
	    error => next(actionWith({
	      type: failureType,
	      error: error.message || 'Something bad happened'
	    })))
}

function queryString(query = {}) {
	let res = '?';
	query.token = token;
	for (let key in query) {
		res += `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}&`;
	}
	return res;
}
