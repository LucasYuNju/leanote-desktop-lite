import { parseUrl } from '../util/RouteUtil';
import * as types from '../constants/ActionTypes';

// Leanote暂时只有一个URL pattern：'/:subject/:noteStackType?-:noteStackId?/:noteId?'
// 所有的路由变化的来源，包括超链接、selectNote()和selectNoteStack()，都是基于state.navigator.path的，和当前真实的window.location.hash无关。
// 以确保在state.navigator反序列化之后（此时window.location.hash !== state.navigator.path），页面路由仍然能够正常工作。

const URL_PATTERN = '/:subject/:noteStackType?-:noteStackId?/:noteId?';

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
    const params = parseUrl(URL_PATTERN, getState().navigator.path);
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
    const params = parseUrl(URL_PATTERN, getState().navigator.path);
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
  const params = parseUrl(URL_PATTERN, path);
  console.log(path, params);
 	return { type: types.REPLACE_PARAMS, payload: { path, params }};
}

window.location.hash = '/edit';
window.addEventListener('hashchange', () => {
  changePath(window.location.hash);
});
