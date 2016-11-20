import { constructUrl, parseUrl } from '../Util/RouteUtil';
import * as types from '../constants/ActionTypes';

/**
 * Navigator records each page's position in h5 history stack.
 */

// Indicating whether hashChange is triggered by clicking navigating button.
let manualHashChange = false;

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
			if (manualHashChange) {
				dispatch(changePath(window.location.hash, false));
			}
			else {
				if (getState().navigator.path !== window.location.hash) {
					dispatch(changePath(window.location.hash, true));
				}
			}
			manualHashChange = false;
		}
		setTimeout(() => {
			if (window.location.hash) {
				// dispatch(navigateTo(window.location.hash));
			}
		});
	}
}

export function navigateBack() {
	manualHashChange = true;
	window.history.back();
	return { type: types.NAVIGATE_BACK };
}

export function navigateForward() {
	manualHashChange = true;
	window.history.forward();
	return { type: types.NAVIGATE_FORWARD };
}

// Used to select default notebook or note
export function replaceState(path) {
	return (dispatch) => {
		window.history.replaceState(null, '', path);
		dispatch(changePath(path));
	}
}

// If hashchange is caused by clicking hyperlink, all the following browser-history will be overriden.
function changePath(path, overrideHistory) {
 	return { type: types.CHANGE_PATH, path, overrideHistory};
}
