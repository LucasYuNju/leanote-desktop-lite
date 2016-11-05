import combineImmutableReducers from '../store/combineImmutableReducers';
import { fromJS, List, Map } from 'immutable';
import * as types from '../constants/ActionTypes';

function flat(root, map) {
  root = root.set('NoteIds', List());
  root = root.set('ChildIds', root.get('Subs').map(node => node.get('NotebookId')));
  root.get('Subs').forEach(sub => flat(sub, map));
  root = root.set('Subs', null);
  map.set(root.get('NotebookId'), root);
}

function note(state = Map(), action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return state.set(action.note.NoteId, action.note);
    case types.RECEIVE_NOTES:
      if (action.notes.length > 0) {
        return state.withMutations(mutableState => {
          action.notes.forEach(note => {
            mutableState.set(note.NoteId, fromJS(note));
          });
        });
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
    ChildIds: [],
    Subs: [],
  }
});

function notebook(state = initialNotebook, action) {
  switch (action.type) {
    case types.ADD_NOTE:
      return state.updateIn([action.notebookId, 'NoteIds'], noteIds => noteIds.unshift(actino.note.NoteId));
    case types.RECEIVE_NOTES:
      const noteIds = action.notes.map(note => note.NoteId);
      return state.setIn([action.notebookId, 'NoteIds'], List(noteIds));
    case types.RECEIVE_NOTEBOOKS:
      if (action.value) {
        state = Map({root: state.get('root')});
        state = state.setIn(['root', 'Subs'], fromJS(action.value));
        return state.withMutations(mutableState => {
          flat(mutableState.get('root'), mutableState);
        });
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
