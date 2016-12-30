import { constructUrl, parseUrl } from '../util/RouteUtil';
import * as types from '../constants/ActionTypes';

// Used to select default notebook or note
export function replaceState(path) {
	return (dispatch) => {
		window.history.replaceState(null, '', path);
		dispatch(changePath(path));
	}
}

export function changePath(path) {
 	return { type: types.CHANGE_PATH, path};
}
