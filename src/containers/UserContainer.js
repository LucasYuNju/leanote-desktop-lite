import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import User from '../components/User';

class UserContainer extends Component {
  render() {
    const {
      Username: username,
      Logo: logo,
    } = this.props.user.info;
    console.log(this.props.user);
    return (
      <User username={username} logo={logo} />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  
}

export default connect(mapStateToProps)(UserContainer);
