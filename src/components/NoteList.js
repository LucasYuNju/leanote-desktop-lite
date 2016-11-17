import React, { Component, PropTypes } from 'react';

import List from '../components/List';
import makeSelectable from '../components/makeSelectable';
import NoteListHeader from '../components/NoteListHeader';
import NoteListItem from '../components/NoteListItem';

const SelectableList = makeSelectable(List);

class NoteList extends Component {
  static propTypes = {
    selectNote: PropTypes.func.isRequired,
    sortNoteList: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired,
    selectedNote: PropTypes.object,
    noteListId: PropTypes.string,
    noteListTitle: PropTypes.string,
    view: PropTypes.string,
  };

  static defaultProps = {
    view: 'snippet',
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.noteListId === nextProps.noteListId) {
      return true;
    }
    else {
      // select first note by default.
      if (nextProps.notes.length) {
        this.props.selectNote(nextProps.notes[0].noteId);
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
        content={note.content}
        id={note.noteId}
				key={note.noteId}
        snippet={note.abstract}
        starred={note.star}
        title={note.title}
        updatedTime={note.updatedTime}
        imgSrc={note.imgSrc}
      />
    );
  }

  render() {
    const { notes, selectNote, selectedNote, sortNoteList, noteListTitle } = this.props;
    return (
      <div className="note-list">
        <NoteListHeader
          title={noteListTitle}
          sortNoteList={sortNoteList}
        />
        <SelectableList
          className="note-list-items"
          onChange={this.handleNoteSelect}
          id={selectedNote ? selectedNote.noteId : null}
        >
          {notes.map(this.renderNote)}
        </SelectableList>
      </div>
    );
  }

	handleNoteSelect = (item) => {
		this.props.selectNote(item.props.id);
	}
}

export default NoteList;
