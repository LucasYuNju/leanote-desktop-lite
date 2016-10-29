import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Profile from '../components/Profile';

class UserContainer extends Component {
  render() {
    const user = this.props.user.info;
    return (
      <Profile username={user.Username} logo={user.Logo} />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(UserContainer);
