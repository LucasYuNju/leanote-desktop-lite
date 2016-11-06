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
  if (noteList.selected.type === 'notebook') {
    const notebook = entities.notebook[noteList.selected.id]
    notes = notebook.NoteIds.map(noteId => entities.note[noteId]);
  }
  const selectedNote = note.selected ? entities.note[note.selected] : null;
  return {
    notes,
    selectedNote,
    selectedNoteList: noteList.selected,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
