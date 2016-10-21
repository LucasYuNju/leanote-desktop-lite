import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import List from '../components/List';
import makeSelectable from '../components/makeSelectable';
import NoteListItem from '../components/NoteListItem';

const SelectableList = makeSelectable(List);

class NoteList extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired,
    selectNote: PropTypes.func.isRequired,
    selectedNote: PropTypes.object,
    view: PropTypes.string,
  };

  static defaultProps = {
    view: 'snippet',
  };

  componentWillReceiveProps(nextProps) {
    // const notes = this.props.notes;
    // const newNotes = nextProps.notes;
    // let sameList = true;
    // if (notes.length !== newNotes.length) {
    //   sameList = false;
    // }
    // for(let i = 0; i < notes.length; i++) {
    //   if (notes[i].NoteId !== newNotes[i].NoteId) {
    //     sameList = false;
    //     break;
    //   }
    // }
    // // TODO need sort here? use shllowCompare instead.
    // // console.log(sameList, shallowCompare(this, nextProps, this.state));
    // if (!sameList) {
    //   let selected = null;
    //   if (newNotes.length) {
    //     this.props.selectNote(newNotes[0].NoteId);
    //   }
    //   else {
    //     this.props.selectNote(null);
    //   }
    // }
  }

  renderNote(note) {
    return (
      <NoteListItem
        content={note.Content}
        key={note.NoteId}
        value={note.NoteId}
        snippet={note.Abstract}
        starred={note.Star}
        title={note.Title}
        updatedTime={note.UpdatedTime}
      />
    );
  }

  render() {
    const {
      notes,
      selectNote,
      selectedNote,
    } = this.props;
    return (
      <SelectableList
        className="note-list"
        onChange={selectNote}
        value={selectedNote ? selectedNote.NoteId : null}
      >
        {notes.map(this.renderNote)}
      </SelectableList>
    );
  }
}

export default NoteList;
