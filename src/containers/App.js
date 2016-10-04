import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import LoginPage from './LoginPage';
import MainPage from './MainPage';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router history={hashHistory}>
          <Route path="/login" component={LoginPage} />
          <Route path="/note" component={MainPage} />
        </Router>
      </div>
    );
  }
}

export default App;
