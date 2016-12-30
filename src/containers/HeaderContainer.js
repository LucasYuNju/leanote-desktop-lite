import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/Header';
import * as NoteActions from '../actions/NoteActions';
import * as NavigatorActions from '../actions/NavigatorActions';
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
  const params = parseUrl('/:noteListType?/:noteListId?/notes/:noteId?', navigator.path) || {};
  const {
    noteListType,
    noteListId,
  } = params;

  return {
    userId: user.userId,
    notebookId: noteListType === 'notebooks' ? noteListId : null,
		navigateBackEnabled: navigator.current > 1,
		navigateForwardEnabled: navigator.current < navigator.length,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...NoteActions, ...NavigatorActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
