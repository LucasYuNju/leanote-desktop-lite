import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'

import DevTools from './containers/DevTools';
import Main from './containers/Main';
import configureStore from './store/configureStore';

ReactDOM.render(
  <Provider store={configureStore()}>
    <div>
      <Main />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
