import * as types from '../constants/ActionTypes';

const initialState = {
	path: '',
  params: {},
};

export default function navigator(state = initialState, action) {
	switch(action.type) {
		case types.REPLACE_PARAMS:
      return {
        ...state,
        path: action.payload.path,
        params: action.payload.params,
      };
		default:
			return state;
	}
}
