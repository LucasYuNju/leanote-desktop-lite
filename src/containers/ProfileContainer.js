import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Profile from '../components/Profile';

class UserContainer extends Component {
  render() {
    const info = this.props.user.info;
    return (
      <Profile username={info.Username} logo={info.Logo} />
    );
  }
}

function mapStateToProps(state) {
  const {
    user,
  } = state;
  return {
    user: user.toJS(),
  };
}

export default connect(mapStateToProps)(UserContainer);
