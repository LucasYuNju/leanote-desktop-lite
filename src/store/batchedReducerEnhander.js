import { BATCH_ACTIONS } from '../constants/ActionTypes';

export default function batchedReducerEnhancer(reducer) {
  return (state, action, ...rest) => {
    if (action.type === BATCH_ACTIONS && action.actions instanceof Array) {
      state = action.actions.reduce(reducer, state);
    } else {
      state = reducer(state, action);
    }
    return state;
  };
}
