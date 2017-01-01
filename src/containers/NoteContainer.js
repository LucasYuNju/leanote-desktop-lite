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
    router,
  } = state;
	const props = {
		allTags: Object.keys(entities.tags),
	};
  if (router.params.noteId) {
		props.editMode = editMode[router.params.noteId] || false;
    props.note = entities.notes[router.params.noteId];
		props.notebook = entities.notebooks[props.note.notebookId];
  }
	return props;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...NoteActions, ...TagActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
