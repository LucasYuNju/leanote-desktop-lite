import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import NoteList from '../components/NoteList';
import * as NoteActionCreators from '../actions/NoteActions';

class NoteListContainer extends Component {
  render() {
    return (
      <NoteList {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  let {
    entities,
    note,
    noteList: noteListRef,
  } = state;

  const result = {
    notes: [],
    selectedNote: entities.notes.byId[note.id],
  };
  if (noteListRef.id) {
    const noteList = entities[noteListRef.type].byId[noteListRef.id];
    const order = noteListRef.order;
    // TODO rewrite with reselect
    result.notes = noteList.noteIds
      .map(noteId => entities.notes.byId[noteId])
      .sort((note1, note2) => {
        let extractKey = (note) => note[order.key];
        if (order.key.toLowerCase().includes('time')) {
          extractKey = (note) => new Date(note[order.key]);
        }
        const key1 = extractKey(note1);
        const key2 = extractKey(note2);
        return order.ascending ? key1 > key2 : key1 < key2;
      });
    result.noteListId = noteListRef.id;
    result.noteListTitle = noteListRef.type === 'tags' ? noteList.tag : noteList.title;
  }
  return result;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
