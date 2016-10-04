import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchNotebooks } from '../actions/NotebookActions';
import HeaderContainer from '../containers/HeaderContainer';
import NavContainer from '../containers/NavContainer';
import NoteList from '../components/NoteList';
import WindowUtil from '../util/WindowUtil';

class NotePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    WindowUtil.setProperties({
      resizable: true,
      width: 1000,
      height: 660,
    });
  }

  render() {
    return (
      <div className="note-page">
        <HeaderContainer />
        <div className="content">
          <NavContainer/>
          <NoteList/>
        </div>
      </div>
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
  console.log('state', state);
  if (selectedNotebookId && notebooks[selectedNotebookId].Notes) {
    currentNotes = notebooks[selectedNotebookId].Notes.map(noteId => notes[noteId]);
    console.log('notes', currentNotes);
  }
  return {
    notes: currentNotes,
  };
}

export default connect(mapStateToProps)(NotePage);
