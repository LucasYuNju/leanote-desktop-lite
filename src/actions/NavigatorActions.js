import * as types from '../constants/ActionTypes';

/**
 * Navigator records each page's position in h5 history stack.
 * Cannot decide hashchange is triggered by clicking navigate button or clicking Link with window.onhashchange event.
 */
export function initNavigator() {
	return (dispatch, getState) => {
		window.onhashchange = (e) => {
			console.log('hash change', window.location.hash);
		}
	}
}

export function navigateTo(route) {
	return (dispatch) => {
		dispatch(changePath(route));
	}
}

export function navigateBack() {
	history.back();
}

export function navigateForward() {
	history.forward();
}

function changePath(route) {
  return { type: types.CHANGE_PATH, route };
}
