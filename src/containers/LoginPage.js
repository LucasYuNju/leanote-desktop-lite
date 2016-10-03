import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from '../components/LoginForm';
import WindowUtil from '../util/WindowUtil';
import * as ActionCreators from '../actions';

class LoginPage extends Component {
  componentWillMount() {
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
        <LoginForm onSubmit={this.props.actions.login}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
