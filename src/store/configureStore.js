import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import localForage from 'localforage';

import apiMiddleware from '../middleware/api';
import batchedReducerEnhancer from './batchedReducerEnhander';
import DevTools from '../containers/DevTools';
import errorLoggerMiddleware from '../middleware/errorLogger';
import rootReducer from '../reducers';

const enhancer = compose(
	applyMiddleware(thunkMiddleware, apiMiddleware, errorLoggerMiddleware),
  autoRehydrate(),
	DevTools.instrument(),
);

export default function configureStore() {
  const reducer = batchedReducerEnhancer(rootReducer);
	const store = enhancer(createStore)(reducer, {});
  const persistor = persistStore(store, { storage: localForage });
  return { store, persistor };
}
