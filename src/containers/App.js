import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Login from '../components/Login';
import Main from '../components/Main';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router history={hashHistory}>
          <Route path="/login" component={Login} />
          <Route path="/main" component={Main} />
        </Router>
      </div>
    );
  }
}

export default App;
