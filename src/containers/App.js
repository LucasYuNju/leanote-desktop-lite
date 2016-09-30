import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import LoginPage from './LoginPage';
import NotePage from './NotePage';

const window = require('electron').remote.getCurrentWindow();

injectTapEventPlugin();

class App extends Component {
  checkAuth(nextState, replace, callback) {
    if (process.env.ENV === 'development') {
      service.user.login('LucasYuNju@gmail.com', '123456', 'https://leanote.com', () => {
        service.user.init(() => {
          callback();
        });
      });
    }
    else {
      service.user.init((userInfo) => {
        if (!userInfo) {
          replace('/login');
          callback();
        }
      });
    }
  }

  toLoginWindow() {
    window.hide();
    window.setSize(320, 420);
    window.setResizable(false);
    window.center();
    window.show();
  }

  toNoteWindow() {
    window.hide();
    window.setSize(1000, 660);
    window.setResizable(true);
    window.center();
    window.show();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <Router history={hashHistory}>
            <Route onEnter={this.checkAuth}>
              <Route path="/login" onEnter={this.toLoginWindow} component={LoginPage} />
              <Route path="/note" onEnter={this.toNoteWindow} component={NotePage} />
            </Route>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
