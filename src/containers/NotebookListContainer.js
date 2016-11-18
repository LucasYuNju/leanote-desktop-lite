import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { parseUrl } from '../util/RouteUtil';
import * as NoteListActionCreators from '../actions/NoteListActions';
import NotebookList from '../components/NotebookList';

class NotebookListContainer extends Component {
  render() {
    return (
			<NotebookList {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {
    entities,
		navigator,
  } = state;
	const params = parseUrl('/:noteListType?/:noteListId?/*', navigator.path) || {};
  return {
    rootNotebookIds: entities.notebooks.rootIds,
    notebooks: entities.notebooks.byId,
		tagIds: entities.tags.allIds,
		...params,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteListActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookListContainer);
