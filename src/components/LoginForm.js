import React, { Component } from 'react';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handlePasswordChagne = this.handlePasswordChagne.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      account: 'LucasYuNju@gmail.com',
      password: '123456',
    };
  }

  handleAccountChange(e) {
    this.setState({ account: e.target.value });
  }

  handlePasswordChagne(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const host = 'https://leanote.com';
    const account = this.state.account;
    const password = this.state.password;
    service.user.login(account, password, host, ret => {
      if (ret) {
        hashHistory.push('/note');
      }
    });
  }

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
            onChange={this.handlePasswordChagne}
          />
        </div>
        <div className="submit row">
          <input type="submit" className="button" value="Login" />
        </div>
        <span className="link switch-host">
          Self-hosted service
        </span>
      </form>
    );
  }
}

export default LoginForm;
