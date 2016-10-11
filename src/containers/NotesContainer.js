import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Notes from '../components/Notes';
import * as NoteActionCreators from '../actions/NoteActions';

class NotesContainer extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired,
  }

  render() {
    return (
      <Notes
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

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
