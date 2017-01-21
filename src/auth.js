import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Login from './containers/Login';
import configureStore from './store/configureStore';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Login />
  </Provider>,
  document.getElementById('root')
);
