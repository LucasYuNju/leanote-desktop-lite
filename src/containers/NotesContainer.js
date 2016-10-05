import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Notes from '../components/Notes';

class NotesContainer extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired,
  }

  render() {
    return (
      <Notes notes={this.props.notes}/>
    );
  }
}

function mapStateToProps(state) {
  const {
    notes,
    notebooks,
    selectedNotebookId,
  } = state;
  let currentNotes = [];
  if (selectedNotebookId && notebooks[selectedNotebookId].Notes) {
    currentNotes = notebooks[selectedNotebookId].Notes.map(noteId => notes[noteId]);
  }
  return {
    notes: currentNotes,
  };
}

export default connect(mapStateToProps)(NotesContainer);
