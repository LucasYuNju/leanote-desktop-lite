import React, { Component, PropTypes } from 'react';

import emitter from '../util/emitter';
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

  componentDidMount() {
    emitter.on('delete-note', this.deleteNote);
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
    console.log('delete note args', note);
    if (this.props.noteId === note.noteId) {
      // 如果note被选中，删除之前先选中下一条笔记
      let index = 0;
      for (; index < this.props.notes.length && this.props.notes[index].noteId !== note.noteId; index++);
      const nextIndex = index === this.props.notes.length - 1 ? index - 1 : index + 1;
      this.props.selectNote(this.props.notes[nextIndex].noteId);
    }
    this.props.deleteNote(note);
  }
}

export default NoteList;
