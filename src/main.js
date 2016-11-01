import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'

import DevTools from './containers/DevTools';
import Main from './containers/Main';
import rootReducer from './reducers/rootReducer';

const enhancer = compose(applyMiddleware(thunkMiddleware), DevTools.instrument());
const store = createStore(rootReducer, {}, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Main />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
