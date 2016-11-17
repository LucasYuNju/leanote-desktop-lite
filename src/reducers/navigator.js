import * as types from '../constants/ActionTypes';

const initialState = {
	path: '',
	length: 1,
	current: 1,
}

export default function navigator(state = initialState, action) {
	switch(action.type) {
		case types.CHANGE_PATH:
			return {
				...state,
				path: action.path,
			}
		default:
			return state;
	}
}
