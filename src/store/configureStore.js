import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist'
import thunkMiddleware from 'redux-thunk';
import localForage from 'localforage';

import apiMiddleware from '../middleware/api';
import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';

const enhancer = compose(
	applyMiddleware(thunkMiddleware, apiMiddleware),
  autoRehydrate(),
	DevTools.instrument(),
);

export default function configureStore() {
  // Enhancer operates on createStore() rather than on store itself.
  // Creating store in such way is more logical.
	const store = enhancer(createStore)(rootReducer, {});
  persistStore(store, { storage: localForage });
  return store;
}
