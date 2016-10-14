import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Note from '../components/Note';

class NoteContainer extends Component {
  render() {
    return (
      <Note note={this.props.note} />
    );
  }
}

function mapStateToProps(state) {
  if (state.selectedNoteId) {
    const note = state.notes[state.selectedNoteId];
    return { note };
  }
  return {};
}

function mapDispatchToProps(dispatch) {
  
}

export default connect(mapStateToProps)(NoteContainer);
