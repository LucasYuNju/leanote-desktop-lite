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
  if (noteList.type !== 'notebooks') {
    return {};
  }
  return {
    userId: user.id,
    notebookId: noteList.id,
    notebookTitle: entities.notebooks.byId[noteList.id].title,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
