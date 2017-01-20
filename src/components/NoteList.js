import React, { Component, PropTypes } from 'react';
import findIndex from 'lodash/findIndex';

import emitter from '../util/emitter';
import List from '../components/List';
import makeSelectable from '../components/makeSelectable';
import NoteListHeader from '../components/NoteListHeader';
import NoteListItem from '../components/NoteListItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const SelectableList = makeSelectable(List);

class NoteList extends Component {
  static propTypes = {
    checkNotes: PropTypes.func.isRequired,
    createNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    postNoteIfNecessary: PropTypes.func.isRequired,
    selectNote: PropTypes.func.isRequired,
    sortNoteList: PropTypes.func.isRequired,
    checked: PropTypes.array.isRequired,
    notes: PropTypes.array,
    noteId: PropTypes.string,
    noteStackId: PropTypes.string,
    noteStackType: PropTypes.string,
    order: PropTypes.object.isRequired,
    view: PropTypes.string,
  };

  static defaultProps = {
    view: 'snippet',
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.noteId && this.props.noteId !== nextProps.noteId) {
        console.log(this.props.noteId, nextProps.noteId);
        const note = this.props.notes.find(n => n.noteId === this.props.noteId)
        this.props.postNoteIfNecessary(note);
    }
  }

  // TODO 如果上一个选中的note是新建的，创建
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.checked.length === 0) {
      if (nextProps.notes.length > 0 && !nextProps.noteId) {
        // 不处于多选模式，默认选中第一个笔记
        this.props.selectNote(nextProps.notes[0].noteId, false);
        return false;
      }
    }
    return true;
  }

  render() {
    console.log('note list render');
    const {
      createNote,
      notes,
			noteId,
      noteStackId,
      noteStackType,
      order,
			sortNoteList,
		} = this.props;
    const notebookId = noteStackType === 'notebook' ? noteStackId : null;
    return (
      <div className="note-list">
        <NoteListHeader
          createNote={createNote}
          order={order}
          sortNoteList={sortNoteList}
          notebookId={notebookId}
        />
        <ReactCSSTransitionGroup
          className="note-list-items transition"
          transitionName="fade"
          transitionLeaveTimeout={300}
          transitionEnterTimeout={250}
          id={noteId}
        >
          {notes.map(this.renderNote)}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  componentDidMount() {
    emitter.on('delete-note', this.deleteNote);
  }

  renderNote = (note) => {
    // TODO performance
    let isSelected;
    if (this.props.checked.length) {
      isSelected = this.props.checked.includes(note.noteId);
    }
    else {
      isSelected = this.props.noteId === note.noteId;
    }
    const noteId = note.aliasId ? note.aliasId : note.noteId;
    console.log('noteId', noteId);
    return (
      <NoteListItem
        deleteNote={this.deleteNote}
        key={noteId}
        id={note.noteId}
        note={note}
        thumbnail={note.thumbnail}
        onShiftClick={this.handleNoteShiftClick}
        onCtrlClick={this.handleNoteMetaClick}
        onClick={this.handleNoteClick}
        selected={isSelected}
      />
    );
  };

  deleteNote = (note) => {
    if (this.props.noteId === note.noteId) {
      // 如果note被选中，删除之前先选中前一条笔记
      const index = findIndex(this.props.notes, (o) => o.noteId === note.noteId);
      if (this.props.notes.length === 1) {
        this.props.selectNote(null);
      }
      else {
        const selected = index === 0 ? 1 : index - 1;
        this.props.selectNote(this.props.notes[selected].noteId);
      }
      this.props.deleteNote(note);
    }
    else if (this.props.checked.includes(note.noteId)) {
      // 如果note在checked数组中，计算minIndex，选中minIndex - 1
      let minIndex = Number.MAX_SAFE_INTEGER;
      this.props.checked.forEach(noteId => {
        minIndex = Math.min(minIndex, findIndex(this.props.notes, (o) => o.noteId === noteId));
      });
      if (minIndex === 0) {
        this.props.selectNote(null);
      }
      else {
        this.props.selectNote(this.props.notes[minIndex].noteId);
      }
      this.props.checked.forEach(noteId => {
        const index = findIndex(this.props.notes, (o) => o.noteId === noteId);
        this.props.deleteNote(this.props.notes[index]);
      });
      this.props.checkNotes([]);
    }
    else {
      this.props.deleteNote(note);
    }
  };

  handleNoteClick = (note) => {

  }

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
      checkedNotes.forEach(noteId => {
        minIndex = Math.min(minIndex, findIndex(this.props.notes, (o) => o.noteId === noteId));
        maxIndex = Math.max(maxIndex, findIndex(this.props.notes, (o) => o.noteId === noteId));
      });
      for (let i = minIndex; i <= maxIndex; i++) {
        if (!checkedNotes.includes(this.props.notes[i].noteId)) {
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
        // selectNote异步触发action，可能会出现this.props.checked和this.props.noteId同时为空的情况，
        // 导致在componentWillReceiveProps中自动选择笔记。因此需要setTimeout
        this.props.checkNotes([]);
      });
    }
    else {
      this.props.checkNotes(checked);
    }
  };
}

export default NoteList;
