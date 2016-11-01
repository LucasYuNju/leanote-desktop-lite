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
    index,
  } = state;
  // TODO too many render at start
  if (noteList.selected.type !== 'notebook') {
    return {};
  }
  return {
    userId: user.toJS().info.UserId,
    notebookId: noteList.selected.id,
    notebookTitle: index.notebook[noteList.selected.id].Title,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
