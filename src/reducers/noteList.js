import { fromJS, Map } from 'immutable';
import * as types from '../constants/ActionTypes';

const initialState = fromJS({
  selected: {},
});

export default function noteList(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_NOTEBOOK:
      if (action.value) {
        return state.set('selected', Map({
          type: 'notebook',
          id: action.value,
        }))
      }
      return state;
    default:
      return state;
  }
}
