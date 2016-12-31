import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import NoteList from '../components/NoteList';
import * as NavigatorActions from '../actions/NavigatorActions';
import * as NoteActions from '../actions/NoteActions';

class NoteListContainer extends Component {
  render() {
    return (
      <NoteList {...this.props} selectNote={this.props.selectNote}/>
    );
  }
}

function mapStateToProps(state) {
  const {
    entities,
		navigator,
    note,
    noteList: noteListRef,
  } = state;
	const {
		noteStackType,
		noteStackId,
		noteId,
	} = navigator.params;

  const result = { ...navigator.params };
  if (noteStackId && (noteStackType === 'notebook' || noteStackType === 'tag')) {
    const noteList = entities[noteStackType + 's'][noteStackId];
    const order = noteListRef.order;
		result.notes = noteList.noteIds
			.map(noteId => entities.notes[noteId])
			.sort((note1, note2) => {
				// TODO refactor
				let extractKey = (note) => note[order.key];
				if (order.key.toLowerCase().includes('time')) {
					extractKey = (note) => new Date(note[order.key]);
				}
				const key1 = extractKey(note1);
				const key2 = extractKey(note2);
				return order.ascending ? key1 > key2 : key1 < key2;
			});
    result.notebookId = noteStackId;
    result.notebookTitle = noteStackType === 'notebook' ? noteList.title : noteList.tag;
  }
  return result;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...NoteActions, ...NavigatorActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
