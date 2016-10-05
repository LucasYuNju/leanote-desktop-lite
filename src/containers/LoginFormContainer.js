import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

import { login } from '../actions/UserActions';
import LoginForm from '../components/LoginForm';

class LoginFormContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  handleFormSubmit = (account, password, host) => {
    return this.props.dispatch(login(account, password, host));
  }
  
  render() {
    return (
      <LoginForm
        onSubmit={this.handleFormSubmit}
      />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(LoginFormContainer);
