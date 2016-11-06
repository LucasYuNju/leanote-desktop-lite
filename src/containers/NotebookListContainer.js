import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import * as NotebookActionCreators from '../actions/NotebookActions';
import NotebookList from '../components/NotebookList';

class NotebookListContainer extends Component {
  render() {
    return (
      <NotebookList {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {
    entities,
    noteList,
  } = state;
  const notebooks = entities.notebook;
  return {
    rootNotebook: notebooks.root,
    notebookIndex: notebooks,
    selectedNoteList: noteList.selected,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NotebookActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookListContainer);
