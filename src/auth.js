import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import Login from './containers/Login';
import rootReducer from './reducers';
import configureStore from './store/configureStore';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Login />
  </Provider>,
  document.getElementById('root')
);
