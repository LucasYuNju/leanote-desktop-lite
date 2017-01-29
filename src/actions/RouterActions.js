import * as types from '../constants/ActionTypes';
import { checkNotes } from './NoteActions';
import { parseUrl } from '../util/router';

/**
 * 只有一种URL格式：'/:subject/:noteStackType?-:noteStackId?/:noteId?'
 * redux-persist反序列化时，会保持router.path和window.location.hash一致
 */

function parseHash(hash) {
  const params = parseUrl('#/:subject/:noteStackType?-:noteStackId?/:noteId?', hash);
  if (Object.keys(params).length) {
    return params;
  }
  // path-to-regex的问题，处理不了带连字符的情况，只能分两种情况分别parse
  return parseUrl('#/:subject/*', hash);
}

function updateHashIfNecessary(dispatch, hash, newHistory) {
  if (window.location.hash === hash) {
    return;
  }
  if (newHistory) {
    window.location.hash = hash;
  }
  else {
    dispatch(replaceState(hash));
  }
}

// 用于选择默认笔记，也就是当前排序的第一条笔记。
// newHistory：hash的变化是否生成新的历史记录，如果是true的话，触发hashchange事件
export function selectNote(noteId, newHistory = true) {
  return (dispatch, getState) => {
    const params = getState().router.params;
    const { subject, noteStackType, noteStackId } = params;
    let hash = `#/${subject}/${noteStackType}-${noteStackId}/`;
    if (noteId) {
      hash += noteId;
    }
    updateHashIfNecessary(dispatch, hash, newHistory);
  };
}

// 用于选择默认笔记本
export function selectNoteStack(noteStackId, noteStackType, newHistory = true) {
  return (dispatch, getState) => {
    const params = getState().router.params;
    const { subject, noteStackType, noteStackId } = params;
    const hash = `#/${subject}/${noteStackType}-${noteStackId}`;
    updateHashIfNecessary(dispatch, hash, newHistory);
  }
}

// 更改当前的window.location.hash，不触发hashchange事件，不影响history stack
export function replaceState(hash) {
	return (dispatch) => {
		window.history.replaceState(null, '', hash);
		dispatch(changePath(hash));
	}
}

export function changePath(path) {
  return (dispatch, getState) => {
    const params = parseHash(path);
    if (params.noteId && getState().noteList.checked.length) {
      dispatch(checkNotes([]));
    }
   	dispatch({ type: types.CHANGE_PATH, payload: { path, params }});
  }
}

// 为了得到dispatch函数的引用，需要由Main调用
export function initRouter() {
  return (dispatch) => {
    if (!window.location.hash) {
      window.location.hash = '/edit/';
    }
    window.addEventListener('hashchange', () => {
      dispatch(changePath(window.location.hash));
    });
  }
}
