import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Profile from '../components/Profile';

class UserContainer extends Component {
  render() {
    return (
      <Profile 
        email={this.props.user.email}
        logo={this.props.user.logo}    
        username={this.props.user.username}
      />
    );
  }
}

function mapStateToProps(state) {
  const {
    user,
    entities,
  } = state;
  return {
    user: entities.users[user],
  };
}

export default connect(mapStateToProps)(UserContainer);
