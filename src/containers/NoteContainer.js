import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import Note from '../components/Note';
import * as NoteActionCreators from '../actions/NoteActions';

class NoteContainer extends Component {
  render() {
    if (this.props.note) {
      return (
        <Note
          note={this.props.note}
          onChange={this.props.updateNote}
        />
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  const {
    index,
    note,
  } = state;
  console.log(state, note.selected);
  if (note.selected) {
    const note = index.getIn(['note', note.selected]);
    console.log(note);
    return { note };
  }
  return {
    note: null,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
