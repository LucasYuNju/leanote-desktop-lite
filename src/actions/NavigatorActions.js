import { parseUrl } from '../util/RouteUtil';
import * as types from '../constants/ActionTypes';

// Leanote暂时只有一个URL pattern：'/:subject/:noteStackType?-:noteStackId?/:noteId?'
// 所有的路由变化的来源，包括超链接、selectNote()和selectNoteStack()，都是基于state.navigator.path的，和当前真实的window.location.hash无关。
// 以确保在state.navigator反序列化之后（此时window.location.hash !== state.navigator.path），页面路由仍然能够正常工作。

function parse(path) {
  const params = parseUrl('/:subject/:noteStackType?-:noteStackId?/:noteId?', path);
  if (Object.keys(params).length) {
    return params;
  }
  // path-to-regex的问题，处理不了带连字符的情况，只能分两种情况分别parse
  return parseUrl('/:subject/*', path);
}

// 更改当前的window.location.hash，不触发hashchange事件，不影响history stack
export function replaceState(path) {
	return (dispatch) => {
    if (!path.startsWith('#')) {
      path = '#' + path;
    }
		window.history.replaceState(null, '', path);
		dispatch(changePath(path));
	}
}

// 用于选择默认笔记，也就是当前排序的第一条笔记。
export function selectNote(noteId) {
  return (dispatch, getState) => {
    const params = getState().navigator.params;
    if (params.subject !== 'edit') {
      console.error(`Action not allowed under current sbuject： ${params.subject}`);
    }
    else {
      const { subject, noteStackType, noteStackId } = params;
      const path = `/${subject}/${noteStackType}-${noteStackId}/${noteId}`;
      console.log('select note', path);
      dispatch(replaceState(path));
    }
  };
}

// 用于选择默认笔记本
export function selectNoteStack(noteStackId, noteStackType) {
  return (dispatch, getState) => {
    const params = getState().navigator.params;
    if (params.subject !== 'edit') {
      console.error(`Action not allowed under current sbuject： ${params.subject}`);
    }
    else {
      const { subject, noteStackType, noteStackId } = params;
      const path = `/${subject}/${noteStackType}-${noteStackId}`;
      console.log('select notestack', path);
      dispatch(replaceState(path));
    }
  }
}

export function changePath(path) {
  const params = parse(path);
  console.log('navigator', path, params);
 	return { type: types.CHANGE_PATH, payload: { path, params }};
}

// 为了得到dispatch函数的引用，必须由Main调用
export function initRouter() {
  return (dispatch) => {
    window.addEventListener('hashchange', () => {
      dispatch(changePath(window.location.hash));
    });
    window.location.hash = '/edit';
  }
}
