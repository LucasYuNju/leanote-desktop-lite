import React, { Component, PropTypes } from 'react';

import emitter from '../util/emitter';
import List from '../components/List';
import makeSelectable from '../components/makeSelectable';
import NoteListHeader from '../components/NoteListHeader';
import NoteListItem from '../components/NoteListItem';

const SelectableList = makeSelectable(List);

class NoteList extends Component {
  static propTypes = {
    checkNotes: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    selectNote: PropTypes.func.isRequired,
    sortNoteList: PropTypes.func.isRequired,
    checked: PropTypes.array.isRequired,
    notes: PropTypes.array,
    noteId: PropTypes.string,
    noteStackId: PropTypes.string,
    noteStackTitle: PropTypes.string,
    view: PropTypes.string,
  };

  static defaultProps = {
    view: 'snippet',
  };

  // TODO 默认选中的逻辑还是有问题

  componentWillReceiveProps(nextProps) {
    if (this.props.noteId !== nextProps.noteId) {
      // clear selection
      const index = this.indexOfNote(nextProps.noteId, nextProps.notes);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if (nextProps.notes.length > 0 && !nextProps.noteId) {
    //   // 默认选中第一个笔记
    //   if (nextProps.checked.length <= 1) {
    //     // 不处于多选模式
    //     this.props.selectNote(nextProps.notes[0].noteId, false);
    //     return false;
    //   }
    // }
    return true;
  }

  render() {
    // console.log(this.props);
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
        <div
          className="note-list-items"
          id={noteId}
        >
          {notes.map(this.renderNote)}
        </div>
      </div>
    );
  }

  componentDidMount() {
    emitter.on('delete-note', this.deleteNote);
  }

  renderNote = (note) => {
    const isSelected = this.props.checked.includes(note.noteId);
    return (
      <NoteListItem
        deleteNote={this.deleteNote}
        key={note.noteId}
        id={note.noteId}
        note={note}
        thumbnail={note.thumbnail}
        onShiftClick={this.handleNoteShiftClick}
        onCtrlClick={this.handleNoteMetaClick}
        selected={isSelected}
      />
    );
    // TODO performance
  };

  deleteNote = (note) => {
    if (this.props.noteId === note.noteId) {
      // 如果note被选中，删除之前先选中下一条笔记
      const index = this.indexOfNote(note.noteId, this.props.notes);
      const nextIndex = index === this.props.notes.length - 1 ? index - 1 : index + 1;
      this.props.selectNote(this.props.notes[nextIndex].noteId);
    }
    this.props.deleteNote(note);
  };

  handleNoteShiftClick = (note) => {

  };

  handleNoteMetaClick = (note) => {
    // Treat state as if it was immutable
    const index = this.props.checked.indexOf(note.noteId);
    if (index === -1) {
      this.props.checkNotes(this.props.checked.concat([note.noteId]));
    }
    else if (this.props.checked.length > 1) {
      const checked = this.props.checked.slice();
      checked.splice(index, 1);
      this.props.checkNotes(checked);
    }
  };

  indexOfNote = (noteId, notes) => {
    let index = 0;
    for (; index < notes.length && notes[index].noteId !== noteId; index++);
    return index < notes.length ? index : -1;
  }
}

export default NoteList;
