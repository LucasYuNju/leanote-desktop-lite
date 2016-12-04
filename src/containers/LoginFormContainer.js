import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import * as UserActionCreators from '../actions/UserActions';
import LoginForm from '../components/LoginForm';

class LoginFormContainer extends Component {
  render() {
    return (
      <LoginForm {...this.props} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActionCreators, dispatch);
}

export default connect(() => ({}), mapDispatchToProps)(LoginFormContainer);
