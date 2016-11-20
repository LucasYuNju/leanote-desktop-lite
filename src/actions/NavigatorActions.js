import { constructUrl, parseUrl } from '../Util/RouteUtil';
import * as types from '../constants/ActionTypes';

/**
 * Navigator records each page's position in h5 history stack.
 * Cannot decide hashchange is triggered by clicking navigate button or clicking Link with window.onhashchange event.
 */

let hashChangedManually = false;

function hashchange(dispatch, getState) {
	const hash = window.location.hash;
	console.log('hash change', hash);
	if (getState().navigator.path !== hash) {
		dispatch(navigateTo(hash));
	}
};

export function initNavigator() {
	return (dispatch, getState) => {
		window.onhashchange = (e) => {
			if (hashChangedManually) {
				dispatch(changePath(window.location.hash, true));
			}
			else {
				if (getState().navigator.path !== window.location.hash) {
					dispatch(changePath(window.location.hash, false));
				}
			}
			hashChangedManually = false;
		}
		setTimeout(() => {
			if (window.location.hash) {
				// dispatch(navigateTo(window.location.hash));
			}
		});
	}
}

export function navigateBack() {
	hashChangedManually = true;
	window.history.back();
	console.log(window.location.hash);
	return { type: types.NAVIGATE_BACK };
}

export function navigateForward() {
	hashChangedManually = true;
	window.history.forward();
	return { type: types.NAVIGATE_FORWARD };
}

function changePath(path, manually) {
 	return { type: types.CHANGE_PATH, path, manually};
}

// export function navigateTo(...subPaths) {
// 	const hash = constructUrl(subPaths);
// 	window.location.hash = hash;
// }
