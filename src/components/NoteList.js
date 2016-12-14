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
    notes: PropTypes.array,
    noteId: PropTypes.string,
    notebookId: PropTypes.string,
    notebookTitle: PropTypes.string,
    view: PropTypes.string,
  };

  static defaultProps = {
    view: 'snippet',
  };

  shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.noteId) {
			return true;
		}
		if (this.props.noteListId === nextProps.noteListId) {
      // Note stack just get fetched.
      const numNotes = this.props.notes ? this.props.notes.length : 0;
      if (numNotes === 0 && nextProps.notes && nextProps.notes.length) {
        this.props.selectNote(nextProps.notes[0].noteId);
      }
		}
		else {
      // Switched to another note stack, whose notes is cached
      if (nextProps.notes.length) {
        this.props.selectNote(nextProps.notes[0].noteId);
      }
		}
		return false;
  }

  renderNote(note) {
    return (
      <NoteListItem
				key={note.noteId}
        note={note}
        thumbnail={''}
      />
    );
  }

  render() {
    const {
			notes,
			noteId,
			sortNoteList,
			notebookTitle
		} = this.props;
    return (
      <div className="note-list">
        <NoteListHeader
          title={notebookTitle}
          sortNoteList={sortNoteList}
        />
        <SelectableList
          className="note-list-items"
          onChange={this.handleNoteSelect}
          id={noteId}
        >
          {notes ? notes.map(this.renderNote) : null}
        </SelectableList>
      </div>
    );
  }

	handleNoteSelect = (item) => {
		this.props.selectNote(item.props.id);
	}
}

export default NoteList;
