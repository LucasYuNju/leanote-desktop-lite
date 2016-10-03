import { combineReducers } from 'redux';
import * as types from '../actions/ActionTypes';

const stateStructure = {
  user: {
    needLogin: true,
  },
  notes: [],
  notebooks: [],
  selectedNote: {},
  selectedNotebook: {},
};

function user(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_LOGIN:
      if (action.status) {
        if (action.status === 'success') {
          return Object.assign({}, state, {
            userInfo: action.userInfo,
          });
        }
        else {
          return state;
        }
      }
    default:
      return state;
  }
}

function notebooks(state = [], action) {
  switch (action.type) {
    case types.REQUEST_NOTEBOOKS:
      if (action.response) {
        return action.response;
      }
    default:
      return state;
  }
}

function selectNote(state = {}, action) {
  switch (action.type) {
    case types.SELECT_NOTE:
      return action.value;
    default:
      return state;
  }
}

function selectNotebook(state = {}, action) {
  switch (action.type) {
    case types.SELECT_NOTEBOOK:
      return action.value;
    default:
      return state;
  }
}

const leanoteApp = combineReducers({
  notebooks,
  selectNote,
  selectNotebook,
  user,
})

export default leanoteApp;
