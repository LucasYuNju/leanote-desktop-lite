import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Note from '../components/Note';
import * as NoteActionCreators from '../actions/NoteActions';

class NoteContainer extends Component {
  render() {
    return (
      <Note
        note={this.props.note}
        onChange={this.props.updateNote}
      />
    );
  }
}

function mapStateToProps(state) {
  if (state.selectedNote) {
    const note = state.notes[state.selectedNote];
    return { note };
  }
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
