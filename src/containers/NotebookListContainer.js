import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import * as NoteListActionCreators from '../actions/NoteListActions';
import NotebookList from '../components/NotebookList';
import Match from '../components/Match';

class NotebookListContainer extends Component {
  render() {
    return (
			<Match
				pattern="/:noteListType/:selectedNoteListId"
				component={NotebookList}
				{...this.props}
			/>
    );
  }
}

function mapStateToProps(state) {
  const {
    entities,
  } = state;
  return {
    rootNotebookIds: entities.notebooks.rootIds,
    notebooks: entities.notebooks.byId,
		tagIds: entities.tags.allIds,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteListActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookListContainer);
