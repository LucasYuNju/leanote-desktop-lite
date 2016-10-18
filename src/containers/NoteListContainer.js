import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NoteList from '../components/NoteList';
import * as NoteActionCreators from '../actions/NoteActions';

class NoteListContainer extends Component {
  render() {
    return (
      <NoteList {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {
    notes,
    notebooks,
    selectedNoteId,
    selectedNotebookId,
  } = state;
  
  let displayedNotes = [];
  if (selectedNotebookId && notebooks[selectedNotebookId].Notes) {
    displayedNotes = notebooks[selectedNotebookId].Notes.map(noteId => notes[noteId]);
  }
  return {
    notes: displayedNotes,
    selectedNoteId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
