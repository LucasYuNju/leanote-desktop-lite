import * as types from '../constants/ActionTypes';

const initialState = {
	path: '',
	length: 1,
	current: 1,
}

export default function navigator(state = initialState, action) {
	switch(action.type) {
		case types.CHANGE_PATH:
			if (action.overrideHistory) {
				return {
					current: state.current + 1,
					length: state.current + 1,
					path: action.path,
				}
			}
			return {
				...state,
				path: action.path,
			}
		case types.NAVIGATE_BACK:
			return {
				...state,
				current: state.current - 1,
			}
		case types.NAVIGATE_FORWARD:
			return {
				...state,
				current: state.current + 1,
			}
		default:
			return state;
	}
}
