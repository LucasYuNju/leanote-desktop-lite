import { batchedSubscribe } from 'redux-batched-subscribe';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';

const enhancer = compose(
	applyMiddleware(thunkMiddleware),
	DevTools.instrument()
);

export default function configureStore() {
  const store = createStore(rootReducer, {}, enhancer);
  return store;
}
