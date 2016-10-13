import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NoteList from '../components/NoteList';
import * as NoteActionCreators from '../actions/NoteActions';

class NoteListContainer extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired,
  }

  render() {
    return (
      <NoteList
        notes={this.props.notes}
        onChange={this.props.selectNote}
      />
    );
  }
}

function mapStateToProps(state) {
  const {
    notes,
    notebooks,
    selectedNotebookId,
  } = state;
  
  let displayedNotes = [];
  if (selectedNotebookId && notebooks[selectedNotebookId].Notes) {
    displayedNotes = notebooks[selectedNotebookId].Notes.map(noteId => notes[noteId]);
  }
  return {
    notes: displayedNotes,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
