import React, { Component } from 'react';

import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="draggable" />
        <a className="logo" href="http://leanote.com">
          <img src="images/leanote-icon-en.png" alt="leanote" />
        </a>
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
