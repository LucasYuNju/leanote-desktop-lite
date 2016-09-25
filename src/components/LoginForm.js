import React, { Component } from 'react';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handlePasswordChagne = this.handlePasswordChagne.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      account: '',
      password: '',
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
    Service.user.login(account, password, host, ret => {
      if (ret) {
        hashHistory.push('/note');
      }
    });
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Username or Email"
          value={this.state.account}
          onChange={this.handleAccountChange}
        />
        <input
          type="password"
          placeholder="Username or Email"
          value={this.state.password}
          onChange={this.handlePasswordChagne}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

export default LoginForm;
