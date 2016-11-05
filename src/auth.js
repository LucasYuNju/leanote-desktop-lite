import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import Login from './containers/Login';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // async action
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Login />
  </Provider>,
  document.getElementById('root')
);
