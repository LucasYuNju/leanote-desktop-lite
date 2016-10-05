import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

import { login } from '../actions/UserActions';
import LoginFormContainer from '../containers/LoginFormContainer';
import WindowUtil from '../util/WindowUtil';

class Login extends Component {
  componentDidMount() {
    WindowUtil.setProperties({
      resizable: process.env.ENV === 'development',
      resizable: true,
      width: 320,
      height: 420,
    });
  }

  render() {
    return (
      <div className="login-page title-bar">
        <div className="logo" >
          <img src="images/leanote-icon-en.png" alt="leanote" />
        </div>
        <LoginFormContainer />
      </div>
    );
  }
}

export default Login;
