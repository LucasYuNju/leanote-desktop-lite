import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/Header';
import * as NoteActionCreators from '../actions/NoteActions';

class HeaderContainer extends Component {
  render() {
    return (
      <Header {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {
    user,
    noteList,
    entities,
  } = state;
  // TODO
  if (noteList.getIn(['selected', 'type']) !== 'notebook') {
    return {};
  }
  const selectedNotebookId = noteList.getIn(['selected', 'id']);
  return {
    userId: user.toJS().info.UserId,
    notebookId: selectedNotebookId,
    notebookTitle: entities.getIn(['notebook', selectedNotebookId, 'Title']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
