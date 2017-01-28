import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Login from './containers/Login';
import configureStore from './store/configureStore';

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Login />
  </Provider>,
  document.getElementById('root')
);
