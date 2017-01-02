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
    selectMultipleNotes: PropTypes.func.isRequired,
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

  constructor(props) {
    super(props);
    if (this.props.noteId) {
      this.state = {
        selectedNotes: { [this.props.noteId]: true },
      }
    }
    else {
      this.state = {
        selectedNotes: {},
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.noteId !== nextProps.noteId) {
      // clear selection
      const index = this.indexOfNote(nextProps.noteId, nextProps.notes);
      this.setState({
        selectedNotes: { [nextProps.noteId]: true },
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 默认选中第一个笔记
    if (nextProps.notes.length > 0 && !nextProps.noteId) {
      this.props.selectNote(nextProps.notes[0].noteId, false);
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
    return (
      <NoteListItem
        deleteNote={this.deleteNote}
        key={note.noteId}
        id={note.noteId}
        note={note}
        thumbnail={note.thumbnail}
        onShiftClick={this.handleNoteShiftClick}
        onCtrlClick={this.handleNoteMetaClick}
        selected={this.state.selectedNotes[note.noteId] ? true : false}
      />
    );
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
    const index = this.indexOfNote(note.noteId, this.props.notes);
    const selectedNotes = { ...this.state.selectedNotes };
    if (selectedNotes[note.noteId] && Object.keys(selectedNotes).length > 1) {
      delete selectedNotes[note.noteId];
      this.setState({
        selectedNotes,
      });
    }
    else {
      selectedNotes[note.noteId] = true;
      this.setState({
        selectedNotes,
        shiftSelectFrom: note.noteId,
      });
    }
    // 如果只剩下一个被选中的笔记，显示笔记内容
    if (Object.keys(selectedNotes).length === 1) {
      this.props.selectNote(Object.keys(selectedNotes)[0]);
    }
  };

  indexOfNote = (noteId, notes) => {
    let index = 0;
    for (; index < notes.length && notes[index].noteId !== noteId; index++);
    return index < notes.length ? index : -1;
  }
}

export default NoteList;
