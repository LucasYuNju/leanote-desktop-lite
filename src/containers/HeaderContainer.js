import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/Header';
import * as NoteActionCreators from '../actions/NoteActions';
import * as NavigatorActionCreators from '../actions/NavigatorActions';
import { parseUrl } from '../util/RouteUtil';

class HeaderContainer extends Component {
  render() {
    return (
      <Header {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {
		entities,
		navigator,
    noteList,
		user,
  } = state;
  return {
    userId: user.userId,
		navigateBackEnabled: navigator.current > 1,
		navigateForwardEnabled: navigator.current < navigator.length,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...NoteActionCreators, ...NavigatorActionCreators }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
