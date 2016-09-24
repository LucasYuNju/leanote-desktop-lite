import React from 'react';
import { render } from 'react-dom';

import launch from './launch';

render(
  <h1>Hello, <span id="username">World</span></h1>,
  document.getElementById('content')
);

launch();
