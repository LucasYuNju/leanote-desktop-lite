import React, { Component, PropTypes } from 'react';

const { ipcRenderer } = require('electron');

class LoginForm extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  state = {
    account: 'LucasYuNju@gmail.com',
    password: '123456',
    submitted: false,
  };

  handleAccountChange = (e) => {
    this.setState({
      account: e.target.value
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const account = this.state.account;
    const password = this.state.password;
    const host = 'https://leanote.com';
    this.setState({
      submitted: true,
    });
    this.props
      .login(account, password, host)
      .then(() => {
        setTimeout(() => {
          ipcRenderer.send('auth-succeeded');
        }, 200);
      }, () => {
        // set error msg
      });
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
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
        <span className="link switch-host">
          Self-hosted service
        </span>
      </form>
    );
  }

  renderSpinner() {
    return (
      <div className="sk-fading-circle">
      {
        [...Array(12).keys()].map(i => (<div  key={i} className={`sk-circle${i+1} sk-circle`}></div>))
      }
      </div>
    );
  }
}

export default LoginForm;
