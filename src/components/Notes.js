import React, { Component, PropTypes } from 'react';

import List from '../components/List';
import makeSelectable from '../components/makeSelectable';
import Note from '../components/Note';

const SelectableList = makeSelectable(List);

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

  state = {
    selected: null,
  };

  handleNoteSelect = (event, value) => {
    this.setState({
      selected: value,
    });
  };

  render() {
    return (
      <SelectableList
        className="note-list"
        onChange={this.handleNoteSelect}
        value={this.state.selected}
      >
        {this.props.notes.map(this.renderNote)}
      </SelectableList>   
    );
  }

  renderNote(note) {
    return (
      <Note
        content={note.Content}
        key={note.NoteId}
        value={note.NoteId}
        snippet={note.Abstract}
        starred={note.Star}
        title={note.Title}
        updatedTime={note.UpdatedTime}
      />
    );
  }
}

export default Notes;
