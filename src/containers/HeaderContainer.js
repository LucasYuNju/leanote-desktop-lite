import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/Header';
import * as NoteActions from '../actions/NoteActions';
import * as RouterActions from '../actions/RouterActions';

class HeaderContainer extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

function mapStateToProps(state) {
  const {
		entities,
		router,
		user,
  } = state;

  return {
    userId: user.userId,
    notebookId: router.params.noteStackType === 'notebook' ? router.params.noteStackId : null,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...NoteActions, ...RouterActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
