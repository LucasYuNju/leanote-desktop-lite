import React, { Component, PropTypes } from 'react';

import List from '../components/List';
import makeSelectable from '../components/makeSelectable';
import NoteListHeader from '../components/NoteListHeader';
import NoteListItem from '../components/NoteListItem';

const SelectableList = makeSelectable(List);

class NoteList extends Component {
  static propTypes = {
		fetchNotesIfNeeded: PropTypes.func.isRequired,
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

	componentWillMount() {
		// TODO need fetch notes?
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.notes) {
			nextProps.fetchNotesIfNeeded(nextProps.notebookId);
		}
	}

  shouldComponentUpdate(nextProps, nextState) {
    // if (this.props.notebookId === nextProps.notebookId) {
    //   return true;
    // }
    // else {
    //   // select first note by default.
    //   if (nextProps.notes.length) {
    //     this.props.selectNote(nextProps.notes[0].noteId);
    //   }
    //   else {
    //     this.props.selectNote(null);
    //   }
    //   return false;
    // }
		return true;
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
