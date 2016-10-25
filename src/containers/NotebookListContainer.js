import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    index,
    noteList,
  } = state;
  return {
    rootNotebook: index.notebook.root,
    index,
    selectedNoteList: noteList.selected,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NotebookActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookListContainer);
