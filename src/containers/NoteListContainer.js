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
  if (noteList.getIn(['selected', 'type']) === 'notebook') {
    const selectedNotebookId = noteList.getIn(['selected', 'id']);
    const selectedNotebook = entities.getIn(['notebook', selectedNotebookId]).toJS();
    notes = selectedNotebook.NoteIds.map(noteId => entities.getIn(['note', noteId]).toJS());
  }
  const selectedNoteId = note.get('selected');
  const selectedNote = selectedNoteId ? entities.getIn(['note', selectedNoteId]).toJS() : null;
  return {
    notes,
    selectedNote,
    selectedNoteList: noteList.get('selected').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
