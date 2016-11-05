import combineImmutableReducers from '../store/combineImmutableReducers';
import { fromJS, List, Map } from 'immutable';
import * as types from '../constants/ActionTypes';

function note(state = Map(), action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return state.set(action.note.NoteId, action.note);
    case types.RECEIVE_NOTES:
      if (action.entities) {
        return state.merge(fromJS(action.entities));
      }
      return state;
    case types.UPDATE_NOTE_SUCCEEDED:
      return state.mergeIn(action.note.NoteId, action.note);
    default:
      return state;
  }
}

const initialNotebook = fromJS({
  root: {
    NotebookId: 'root',
    Subs: [],
  }
});

function notebook(state = initialNotebook, action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return state.updateIn([action.notebookId, 'NoteIds'], noteIds => noteIds.unshift(actino.note.NoteId));
    case types.RECEIVE_NOTES:
      return state.setIn([action.notebookId, 'NoteIds'], List(action.ids));
    case types.RECEIVE_NOTEBOOKS:
      if (action.entities) {
        state = state.merge(fromJS(action.entities));
        state = state.setIn(['root', 'Subs'], fromJS(action.rootIds));
        console.error(state.toJS());
        return state;
      }
      return state;
    default:
      return state;
  }
}

export default combineImmutableReducers({
  note,
  notebook,
});
