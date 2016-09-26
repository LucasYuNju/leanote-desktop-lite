import React, { Component } from 'react';

import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div className="login-page draggable">
        <div className="logo">
          <img src="images/leanote-icon-en.png" alt="leanote" />
        </div>
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
