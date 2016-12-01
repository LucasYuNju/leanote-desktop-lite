import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from '../middleware/api';

import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';

const enhancer = compose(
	applyMiddleware(thunkMiddleware, apiMiddleware),
	DevTools.instrument()
);

// To ensure that you may only apply middleware once, enhancer operates on createStore() rather than on store itself.
export default function configureStore() {
	const enhancedCreateStore = enhancer(createStore);
	return enhancedCreateStore(rootReducer, {});
}
