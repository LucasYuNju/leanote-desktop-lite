import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as NoteActions from '../actions/NoteActions';
import ToolBar from '../components/ToolBar';

class ToolBarContainer extends Component {
  render() {
		if (this.props.note) {
			return (
				<ToolBar {...this.props} />
	    );
		}
		return null;
  }
}

function mapStateToProps(state) {
	const {
		entities,
		editMode,
		navigator,
	} = state;
	const {
		noteId
	} = navigator.params;
	const note = entities.notes[noteId];
	return {
		editMode: editMode[noteId] || false,
		isMarkdown: note ? note.isMarkdown : false,
		note: entities.notes[noteId],
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(NoteActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBarContainer);
