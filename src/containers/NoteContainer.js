import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import Note from '../components/Note';
import * as NoteActionCreators from '../actions/NoteActions';

class NoteContainer extends Component {
  render() {
    if (this.props.note) {
      return (
        <Note
          note={this.props.note}
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
  let selectedNote = null;
  if (note.selected) {
    selectedNote = entities.note[note.selected];
  }
  return {
    note: selectedNote,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
