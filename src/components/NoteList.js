import React, { Component, PropTypes } from 'react';

import List from '../components/List';
import makeSelectable from '../components/makeSelectable';
import NoteListItem from '../components/NoteListItem';

const SelectableList = makeSelectable(List);

class NoteList extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired,
    selectNote: PropTypes.func.isRequired,
    selectedNote: PropTypes.object,
    selectedNoteList: PropTypes.object.isRequired,
    view: PropTypes.string,
  };

  static defaultProps = {
    view: 'snippet',
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.selectedNoteList.type === nextProps.selectedNoteList.type 
    && this.props.selectedNoteList.id === nextProps.selectedNoteList.id) {
      return true;
    }
    else {
      // Switched to a new note list, select first note by default.
      if (nextProps.notes.length) {
        this.props.selectNote(nextProps.notes[0].NoteId);
      }
      else {
        this.props.selectNote(null);
      }
      return false;
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
        imgSrc={note.ImgSrc}
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
