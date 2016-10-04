import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import LoginPage from './LoginPage';
import NotePage from './NotePage';
import WindowUtil from '../util/WindowUtil';

class App extends Component {
  static propTypes = {
    selectedNotebook: PropTypes.string,
  };
  
  render() {
    return (
      <div className="app">
        <Router history={hashHistory}>
          <Route path="/login" component={LoginPage} />
          <Route path="/note" component={NotePage} />
        </Router>
      </div>
    );
  }
}

export default App;
