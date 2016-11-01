import { Map } from 'immutable';

const NODE_ENV = typeof process !== 'undefined' ? process.env.NODE_ENV : 'development'

// combine reducers whose return value is Immutable object.
export default function combineImmutableReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`);
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  return function combination(state = Map(), action) {
    let hasChanged = false;
    let nextState = state;
    finalReducerKeys.forEach(key => {
      const reducer = finalReducers[key];
      nextState = nextState.updateIn([key], prevStateForKey => {
        const nextStateForKey = reducer(prevStateForKey, action);
        if (nextStateForKey === 'undefined') {
          throw new Error(`reducer ${key} returned undefined`);
        }
        hasChanged = hasChanged || prevStateForKey !== nextStateForKey;
        return nextStateForKey;
      });
    });
    return hasChanged ? nextState : state;
  }
}
