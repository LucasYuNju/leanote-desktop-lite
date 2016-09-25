import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './containers/App';
import LoginPage from './containers/LoginPage';
import NotePage from './containers/NotePage';

const window = require('electron').remote.getCurrentWindow();

function checkAuth(nextState, replace) {
  Service.user.init((userInfo) => {
    if (!userInfo) {
      replace('/login');
    }
  });
}

function fitLogin() {
  if (window.getBounds().width !== 280) {
    window.hide();
    window.setSize(280, 370);
    window.center();
    window.show();
  }
}

function fitNote() {
  if (window.getBounds().width !== 1000) {
    window.hide();
    window.setSize(1000, 700);
    window.center();
    window.show();
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={App}>
      <Route onEnter={checkAuth}>
        <Route path="/login" onEnter={fitLogin} component={LoginPage} />
        <Route path="/note" onEnter={fitNote} component={NotePage} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('app'));
