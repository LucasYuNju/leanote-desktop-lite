import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import Note from '../components/Note';
import * as NoteActionCreators from '../actions/NoteActions';

class NoteContainer extends Component {
  render() {
    if (this.props.note) {
			console.log(this.props);
      return (
        <Note
          note={this.props.note}
					notebook={this.props.notebook}
          onChange={this.props.updateNote}
        />
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  const {
    entities,
    note,
  } = state;
	const ret = {};
  if (note.id) {
    ret.note = entities.notes.byId[note.id];
		ret.notebook = entities.notebooks.byId[ret.note.notebookId];
  }
	return ret;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
