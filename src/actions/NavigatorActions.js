import { parseUrl } from '../Util/RouteUtil';
import * as types from '../constants/ActionTypes';

/**
 * Navigator records each page's position in h5 history stack.
 * Cannot decide hashchange is triggered by clicking navigate button or clicking Link with window.onhashchange event.
 */
export function initNavigator() {
	return (dispatch, getState) => {
		window.onhashchange = (e) => {
			const hash = window.location.hash;
			dispatch(changePath(hash));
		}
	}
}

export function navigateBack() {
	history.back();
}

export function navigateForward() {
	history.forward();
}

function changePath(path) {
  return { type: types.CHANGE_PATH, path };
}
