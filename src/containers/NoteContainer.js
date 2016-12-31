import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import Note from '../components/Note';
import * as NoteActions from '../actions/NoteActions';
import * as TagActions from '../actions/TagActions';

class NoteContainer extends Component {
  render() {
    if (this.props.note) {
      return (
        <Note {...this.props} />
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  const {
		editMode,
    entities,
    navigator,
  } = state;
	const {
		noteId,
	} = navigator.params;
	const ret = {
		allTags: Object.keys(entities.tags),
	};
  if (noteId) {
		ret.editMode = editMode[noteId] || false;
    ret.note = entities.notes[noteId];
		ret.notebook = entities.notebooks[ret.note.notebookId];
  }
	return ret;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...NoteActions, ...TagActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
