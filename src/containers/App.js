import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import LoginPage from './LoginPage';
import NotePage from './NotePage';
import WindowUtil from '../util/WindowUtil';
import * as ActionCreators from '../actions';

const routes = (
  <Router history={hashHistory}>
    <Route path="/login" component={LoginPage} />
    <Route path="/note" component={NotePage} />
  </Router>
);

class App extends Component {
  static propTypes = {
    selectedNotebook: PropTypes.string,
  };

  render() {
    return (
      <div className="app">
        {routes}
      </div>
    );
  }
}

function requireAuth(nextState, replace) {
  if (this.props.user.needLogin) {
    replace('/login');
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
