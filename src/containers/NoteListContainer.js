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
  let {
    entities,
    note,
    noteList,
  } = state;

  let notes = [];
  if (noteList.type === 'notebook') {
    const notebook = entities.notebooks[noteList.id]
    notes = notebook.NoteIds.map(noteId => entities.notes[noteId]);
  }
  const selectedNote = note.id ? entities.notes[note.id] : null;
  return {
    notes,
    selectedNote,
    selectedNoteList: noteList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
