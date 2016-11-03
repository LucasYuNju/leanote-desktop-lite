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
    index,
    note,
    noteList,
  } = state;

  let displayedNotes = [];
  if (noteList.selected.type === 'notebook') {
    const selectedNotebook = index.getIn(['notebook', noteList.selected.id]).toJS();
    displayedNotes = selectedNotebook.NoteIds.map(noteId => index.getIn(['note', noteId]).toJS());
  }
  const selectedNoteId = note.get('selected');
  const selectedNote = selectedNoteId ? index.getIn(['note', selectedNoteId]).toJS() : null;
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
