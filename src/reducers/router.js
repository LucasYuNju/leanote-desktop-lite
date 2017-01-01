import * as types from '../constants/ActionTypes';

const initialState = {
	path: '/edit',
  params: {
    subject: 'edit',
  },
};

export default function router(state = initialState, action) {
	switch(action.type) {
		case types.CHANGE_PATH:
      return {
        ...state,
        path: action.payload.path,
        params: action.payload.params,
      };
		default:
			return state;
	}
}
