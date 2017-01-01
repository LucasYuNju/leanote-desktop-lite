import React, { Component, PropTypes } from 'react';

import List from '../components/List';
import makeSelectable from '../components/makeSelectable';
import NoteListHeader from '../components/NoteListHeader';
import NoteListItem from '../components/NoteListItem';

const SelectableList = makeSelectable(List);

class NoteList extends Component {
  static propTypes = {
    deleteNote: PropTypes.func.isRequired,
    selectNote: PropTypes.func.isRequired,
    sortNoteList: PropTypes.func.isRequired,
    notes: PropTypes.array,
    noteId: PropTypes.string,
    noteStackId: PropTypes.string,
    noteStackTitle: PropTypes.string,
    view: PropTypes.string,
  };

  static defaultProps = {
    view: 'snippet',
  };

  shouldComponentUpdate(nextProps, nextState) {
    // 默认选中第一个笔记
    if (nextProps.notes.length > 0 && !nextProps.noteId) {
      this.props.selectNote(nextProps.notes[0].noteId);
      return false;
    }
    return true;
  }

  render() {
    const {
			notes,
			noteId,
			sortNoteList,
			noteStackTitle
		} = this.props;
    return (
      <div className="note-list">
        <NoteListHeader
          title={noteStackTitle}
          sortNoteList={sortNoteList}
        />
        <SelectableList
          className="note-list-items"
          id={noteId}
        >
          {notes.map(this.renderNote)}
        </SelectableList>
      </div>
    );
  }

  renderNote = (note) => {
    return (
      <NoteListItem
        deleteNote={this.deleteNote}
        key={note.noteId}
        id={note.noteId}
        note={note}
        thumbnail={note.thumbnail}
      />
    );
  }

  deleteNote = (note) => {
    // select another note
    console.log('notelist.deletenote', note);
    const notes = this.props.notes;
    let curIndex = 0;
    for (; curIndex < notes.length && notes[curIndex].noteId !== note.noteId; curIndex++);
    const nextIndex = curIndex === notes.length - 1 ? curIndex - 1 : curIndex + 1;

    console.log(curIndex, nextIndex, notes);
    this.props.selectNote(notes[nextIndex].noteId);
    this.props.deleteNote(note);
  }
}

export default NoteList;
