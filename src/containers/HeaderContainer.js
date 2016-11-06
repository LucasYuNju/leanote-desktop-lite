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
  if (noteList.selected.type !== 'notebook') {
    return {};
  }
  const selectedNotebookId = noteList.selected.id;
  return {
    userId: user.info.UserId,
    notebookId: selectedNotebookId,
    notebookTitle: entities.notebook[selectedNotebookId].Title,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
