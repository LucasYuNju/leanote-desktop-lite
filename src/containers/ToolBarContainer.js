import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as NoteActions from '../actions/NoteActions';
import ToolBar from '../components/ToolBar';

class ToolBarContainer extends Component {
  render() {
    return this.props.note ? <ToolBar {...this.props} /> : null;
  }
}

function mapStateToProps(state) {
	const {
		entities,
		editMode,
		router,
	} = state;
	const note = entities.notes[router.params.noteId];
	return {
		editMode: editMode[router.params.noteId] || false,
		isMarkdown: note ? note.isMarkdown : false,
		note: entities.notes[router.params.noteId],
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(NoteActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBarContainer);
