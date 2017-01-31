import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import DevTools from './containers/DevTools';
import Main from './containers/Main';
import configureStore from './store/configureStore';

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Main persistor={persistor} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);

require('electron').webFrame.setZoomLevelLimits(1, 1);
