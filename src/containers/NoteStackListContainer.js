import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import * as NavigatorActions from '../actions/NavigatorActions';
import * as NotebookActions from '../actions/NotebookActions';
import NoteStackList from '../components/NoteStackList';

/**
 * Note stack represents a bunch of notes,
 * like notes belong to the same notebook, or notes having the same tag.
 */
class NoteStackListContainer extends Component {
  render() {
    return (
			<NoteStackList {...this.props}
			selectNoteList={this.props.selectNoteStack}/>
    );
  }
}

function mapStateToProps(state) {
  const {
    entities,
		navigator,
  } = state;
	const rootNotebookIds = Object.keys(entities.notebooks)
		.filter(id => !entities.notebooks[id].parentNotebookId);
  return {
    rootNotebookIds,
    notebooks: entities.notebooks,
		tagIds: Object.keys(entities.tags),
		...navigator.params,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...NotebookActions, ...NavigatorActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteStackListContainer);
