import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import NoteList from '../components/NoteList';
import * as RouterActions from '../actions/RouterActions';
import * as NoteActions from '../actions/NoteActions';

class NoteListContainer extends Component {
  render() {
    return (
      <NoteList {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {
    entities,
		router,
    note,
    noteList,
  } = state;
	const {
		noteStackType,
		noteStackId,
		noteId,
	} = router.params;

  const props = {
    ...router.params,
    noteStackType,
		noteStackId,
    // noteId和entities.notes[noteId].noteId可能不相等，详见NoteActions.createNote
		// noteId: entities.notes[noteId] ? entities.notes[noteId].noteId : noteId,
    noteId,
    notes: [],
    checked: noteList.checked,
  };
  if (noteStackId) {
    const notes = entities[noteStackType + 's'][noteStackId];
    const order = noteList.order;
    // console.log(notes, entities.notes[notes.noteIds[0]]);
		props.notes = notes.noteIds
			.map(noteId => entities.notes[noteId])
      // TODO 为什么note会是undefined
      .filter(note => note && !note.isDeleted && !note.isTrash)
			.sort((note1, note2) => {
				let key = (note) => {
          if (order.key === 'updatedTime') {
            return new Date(note[order.key]);
          }
          return note[order.key];
        };
				const key1 = key(note1);
				const key2 = key(note2);
				return order.ascending ? key1 > key2 : key1 < key2;
			});
    props.order = order;
    props.noteStackId = noteStackId;
    props.noteStackType = noteStackType;
  }
  return props;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...NoteActions, ...RouterActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
