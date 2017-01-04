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
    // 不处于多选模式
    console.log(nextProps);
    if (nextProps.checked.length === 0) {
      if (nextProps.notes.length > 0 && !nextProps.noteId) {
        // 默认选中第一个笔记
        this.props.selectNote(nextProps.notes[0].noteId, false);
        return false;
      }
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
    let isSelected;
    if (this.props.checked.length) {
      isSelected = this.props.checked.includes(note.noteId);
    }
    else {
      isSelected = this.props.noteId === note.noteId;
    }
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
    if (note.noteId === this.props.noteId) {
      return;
    }

    // 将之前选中的笔记放进checked数组
    const checkedNotes = [...this.props.checked];
    if (this.props.noteId) {
      checkedNotes.push(this.props.noteId);
      this.props.selectNote(null, false);
    }

    if (!checkedNotes.includes(note.noteId)) {
      checkedNotes.push(note.noteId);
      let minIndex = Number.MAX_SAFE_INTEGER, maxIndex = -1;
      checkedNotes.forEach(checkedNote => {
        minIndex = Math.min(minIndex, this.indexOfNote(checkedNote, this.props.notes));
        maxIndex = Math.min(maxIndex, this.indexOfNote(checkedNote, this.props.notes));
      });
      for (let i = minIndex; i <= maxIndex; i++) {
        if (!checkNotes.includes(this.props.notes[i].noteId)) {
          checkedNotes.push(this.props.notes[i].noteId);
        }
      }
      this.props.checkNotes(checkedNotes);
    }
  };

  handleNoteMetaClick = (note) => {
    if (note.noteId === this.props.noteId) {
      return;
    }

    // 将之前选中的笔记放进checked数组
    let checked = [...this.props.checked];
    if (this.props.noteId) {
      checked.push(this.props.noteId);
      this.props.selectNote(null, false);
    }

    // 将metaClicked笔记放进checked数组
    const clicked = this.props.checked.indexOf(note.noteId);
    if (clicked === -1) {
      checked.push(note.noteId);
    }
    else if (this.props.checked.length > 1) {
      checked.splice(clicked, 1);
    }

    // 如果checked数组中只剩一个笔记，选中该笔记
    if (checked.length === 1) {
      this.props.selectNote(checked[0], true);
      setTimeout(() => {
        // CHANGE_PATH action异步执行，因此会出现checked和noteId同时为空的情况，在componentWillReceiveProps中自动选择笔记
        // 所以这里需要setTimeout一次
        this.props.checkNotes([]);
      });
    }
    else {
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
