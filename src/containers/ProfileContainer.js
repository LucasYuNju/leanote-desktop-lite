import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Profile from '../components/Profile';

class UserContainer extends Component {
  render() {
    return (
      <Profile {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {
    user,
    entities,
  } = state;
  return {
    user: entities.users.byId[user.id],
  };
}

export default connect(mapStateToProps)(UserContainer);
