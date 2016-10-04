import * as types from '../constants/ActionTypes';

const initialState = {
  item: [],
  selected: null,
}

function flattern(res, notebook) {
  res[notebook.NotebookId] = notebook;
  notebook.childIds = notebook.Subs.map(node => node.NotebookId);
  notebook.Subs.forEach(node => flattern(res, node));
  notebook.Subs = null;
}

export function notebooks(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_NOTES:
      if (action.value.length > 0) {
        // TODO modify state itself
        const notebookId = action.value[0].NotebookId;
        const notebook = state[notebookId];
        notebook.Notes = action.value.map(note => note.NoteId);
      }
      return state;
    case types.RECEIVE_NOTEBOOKS:
      if (action.value) {
        const result = {};
        const root = {
          NotebookId: 'root',
          Subs: action.value,
        };
        flattern(result, root);
        return result;
      }
    default:
      return state;
  }
}

export function selectedNotebookId(state = null, action) {
  switch (action.type) {
    case types.SELECT_NOTEBOOK:
      if (action.value) {
        return action.value;
      }
    default:
      return state;
  }
}
