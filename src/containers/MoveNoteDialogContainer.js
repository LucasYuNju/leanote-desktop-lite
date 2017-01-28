import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import * as RouterActions from '../actions/RouterActions';
import * as NotebookActions from '../actions/NotebookActions';
import MoveNoteDialog from '../components/MoveNoteDialog';
import NotebookTree from '../components/NotebookTree';

class MoveNoteDialogContainer extends Component {
  render() {
    return <MoveNoteDialog {...this.props} />;
  }
}

function mapStateToProps(state) {
  const {
    entities,
  } = state;
	const rootNotebookIds = Object.keys(entities.notebooks)
		.filter(id => !entities.notebooks[id].parentNotebookId);
  return {
    rootNotebookIds,
    notebooks: entities.notebooks,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...NotebookActions, ...RouterActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveNoteDialogContainer);
