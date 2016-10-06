import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';

class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    account: 'LucasYuNju@gmail.com',
    password: '123456',
  };

  componentWillUpdate (nextProps, nextState) {
    if (nextState.submitted) {
      hashHistory.push('/note');
    }
  }

  // Autologin on dev mode.
  componentDidMount() {
    if (process.env.ENV === 'development') {
      // this.props
      //   .onSubmit('LucasYuNju@gmail.com', '123456', 'https://leanote.com')
      //   .then(() => {
      //     this.setState({
      //       submitted: true,
      //     });
      //   });
    }
  }

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
    this.props
      .onSubmit(account, password, host)
      .then(() => {
        this.setState({
          submitted: true,
        });
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
