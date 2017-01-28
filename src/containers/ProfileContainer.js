import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

const { ipcRenderer } = require('electron');

import Profile from '../components/Profile';
import * as UserActions from '../actions/UserActions';

class ProfileContainer extends Component {
  render() {
    return <Profile {...this.props} logout={this.logout} />;
  }

  logout = () => {
    ipcRenderer.send('auth-request');
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
