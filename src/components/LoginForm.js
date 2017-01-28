import React, { Component, PropTypes } from 'react';

const { ipcRenderer, remote } = require('electron');

class LoginForm extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    token: PropTypes.string,
  };

  state = {
    account: '',
    password: '',
    submitted: false,
  };

  componentWillReceiveProps(nextProps) {
    const { token } = nextProps;
    if (token) {
      setTimeout(() => {
        ipcRenderer.send('register-protocol', token);
        ipcRenderer.send('auth-success');
      }, 200);
    }
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.handleFormSubmit}>
        <div className="row">
          <input
            type="text"
            placeholder="Username or Email"
            value={this.state.account}
            onChange={this.handleAccountChange}
          />
        </div>
        <div className="row">
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className="submit row">
          {
            this.state.submitted ? (
              <div className="submit-spinner">
                {this.renderSpinner()}
              </div>
            ) :
            <input type="submit" className="button" value="Login" />
          }
        </div>
        <a className="link register" href="https://leanote.com/register" onClick={this.handleRegisterLinkClick}>
          Sign up Leanote
        </a>
      </form>
    );
  }

  renderSpinner() {
    return (
      <div className="sk-fading-circle">
      {[...Array(12).keys()].map(i => (<div  key={i} className={`sk-circle${i+1} sk-circle`}></div>))}
      </div>
    );
  }

  handleAccountChange = (e) => {
    this.setState({
      account: e.currentTarget.value
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.currentTarget.value
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const account = this.state.account;
    const password = this.state.password;
    const host = 'https://leanote.com';
    this.setState({
      submitted: true,
    });
    this.props.login(account, password, host);
  };

  handleRegisterLinkClick = (e) => {
    e.preventDefault();
    remote.shell.openExternal(e.currentTarget.href);
  }
}

export default LoginForm;
