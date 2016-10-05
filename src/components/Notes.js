import React, { Component, PropTypes } from 'react';

import Note from '../components/Note';

class Notes extends Component {
  static propTypes = {
    initialSelection: PropTypes.number,
    notes: PropTypes.array.isRequired,
    view: PropTypes.string,
  };

  static defaultProps = {
    initialSelection: 0,
    view: 'snippet',
  };

  render() {
    return (
      <main>
        <div className="note-list">
          {this.props.notes.map(this.renderNote)}
        </div>
        <div className="note-editor" />
      </main>
    );
  }
  
  renderNote(note) {
    return (
      <Note
        content={note.Content}
        key={note.NoteId}
        selected={false}
        starred={note.Star}
        title={note.Title}
        updatedTime={note.UpdatedTime}
      />
    );
  }  
}

export default Notes;
