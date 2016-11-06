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
    noteList: noteListRef,
  } = state;

  const result = {
    notes: [],
    selectedNote: entities.notes[note.id],
  };
  if (noteListRef.id) {
    const noteList = entities[noteListRef.type][noteListRef.id];
    result.notes = noteList.noteIds.map(noteId => entities.notes[noteId]);
    result.noteListId = noteList.Id;
    result.noteListTitle = noteListRef.type === 'tags' ? noteList.tag : noteList.title;
  }
  return result;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
