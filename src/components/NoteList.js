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
    noteStackId: PropTypes.string,
    noteStackTitle: PropTypes.string,
    view: PropTypes.string,
  };

  static defaultProps = {
    view: 'snippet',
  };

  shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.noteId) {
			return true;
		}
    // 默认选中第一个笔记
		if (this.props.noteStackId === nextProps.noteStackId) {
      const hasNote = this.props.notes ? this.props.notes.length : 0;
      if (hasNote === 0 && nextProps.notes && nextProps.notes.length) {
        // 刚刚获取到笔记本的内容
        this.props.selectNote(nextProps.notes[0].noteId);
      }
		}
		else {
      if (nextProps.notes && nextProps.notes.length) {
        // 切换到新笔记本，且该笔记本已被缓存
        this.props.selectNote(nextProps.notes[0].noteId);
      }
		}
		return false;
  }

  renderNote(note) {
    return (
      <NoteListItem
				key={note.noteId}
        id={note.noteId}
        note={note}
        thumbnail={note.thumbnail}
      />
    );
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
