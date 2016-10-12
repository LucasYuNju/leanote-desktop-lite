import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../components/Login';
import Main from '../components/Main';
import * as UserActionCreators from '../actions/UserActions';

class App extends Component {
  static propTypes = {
    autologin: PropTypes.func.isRequired,
  }

  requireAuth = (nextState, replace, callback) => {
    this.props.autologin()
      .then(() => {
        console.log('autologin succeed');
        callback();
      }, () => {
        replace('/login');
        callback();
      });
  };

  render() {
    return (
      <div className="app">
        <Router history={hashHistory}>
          <Redirect from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/main" onEnter={this.requireAuth} component={Main} />
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
