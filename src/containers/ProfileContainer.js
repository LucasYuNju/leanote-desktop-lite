import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import Profile from '../components/Profile';
import * as UserActions from '../actions/UserActions';

class UserContainer extends Component {
  render() {
    return (
      <Profile {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
