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
    index,
    noteList,
  } = state;
  const notebookIndex = index.get('notebook').toJS();
  return {
    rootNotebook: notebookIndex.root,
    notebookIndex: notebookIndex,
    selectedNoteList: noteList.get('selected').toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NotebookActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookListContainer);
