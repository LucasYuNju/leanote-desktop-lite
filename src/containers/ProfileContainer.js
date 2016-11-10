import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Profile from '../components/Profile';

class UserContainer extends Component {
  render() {
    const info = this.props.user.info;
    return (
      <Profile 
        email={info.Email}
        logo={info.Logo}    
        username={info.Username}
      />
    );
  }
}

function mapStateToProps(state) {
  const {
    user,
  } = state;
  return {
    user: user,
  };
}

export default connect(mapStateToProps)(UserContainer);
