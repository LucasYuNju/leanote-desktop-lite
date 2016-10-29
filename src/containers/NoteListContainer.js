import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

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
    index,
    note,
    noteList,
  } = state;

  let displayedNotes = [];
  if (noteList.selected.type === 'notebook') {
    displayedNotes = index.notebook[noteList.selected.id].NoteIds.map(noteId => index.note[noteId]);
  }
  const selectedNote = note.selected ? index.note[note.selected] : null;
  return {
    notes: displayedNotes,
    selectedNote,
    selectedNoteList: noteList.selected,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
