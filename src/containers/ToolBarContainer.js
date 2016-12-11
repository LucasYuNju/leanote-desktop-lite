import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as NoteActions from '../actions/NoteActions';
import ToolBar from '../components/ToolBar';
import { parseUrl } from '../util/RouteUtil';

class ToolBarContainer extends Component {
  render() {
		if (this.props.noteId) {
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
	const params = parseUrl('/:noteListType/:noteListId/notes/:noteId?', navigator.path) || {};
	const {
		noteId
	} = params;
	const note = entities.notes[noteId];
	return {
		editMode: editMode[noteId] || false,
		isMarkdown: note ? note.isMarkdown : false,
		noteId,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(NoteActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBarContainer);
