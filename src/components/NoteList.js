import React, { Component, PropTypes } from 'react';
import immutable from 'immutable';

import List from '../components/List';
import makeSelectable from '../components/makeSelectable';
import NoteListItem from '../components/NoteListItem';

const SelectableList = makeSelectable(List);

class NoteList extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired,
    selectNote: PropTypes.func.isRequired,
    selectedNote: PropTypes.object,
    view: PropTypes.string,
  };

  static defaultProps = {
    view: 'snippet',
  };

  componentWillReceiveProps(nextProps) {
    const prevNotes = immutable.fromJS(this.props.notes);
    const nextNotes = immutable.fromJS(nextProps.notes);
    if (!immutable.is(prevNotes, nextNotes)) {
      if (nextProps.notes.length ) {
        this.props.selectNote(nextProps.notes[0].NoteId);
      }
    }
  }
  
  renderNote(note) {
    return (
      <NoteListItem
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

  render() {    
    const {
      notes,
      selectNote,
      selectedNote,
    } = this.props;
    return (
      <SelectableList
        className="note-list"
        onChange={selectNote}
        value={selectedNote ? selectedNote.NoteId : null}
      >
        {notes.map(this.renderNote)}
      </SelectableList>
    );
  }
}

export default NoteList;
