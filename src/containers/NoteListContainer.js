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
    selectedNote,
    selectedNotebook,
  } = state;
  
  let activeNotes = [];
  if (selectedNotebook && notebooks[selectedNotebook].Notes) {
    activeNotes = notebooks[selectedNotebook].Notes.map(noteId => notes[noteId]);
  }
  return {
    notes: activeNotes,
    selectedNote,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
