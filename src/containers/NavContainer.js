import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import * as RouterActions from '../actions/RouterActions';
import * as NotebookActions from '../actions/NotebookActions';
import Nav from '../components/Nav';
import NotebookTree from '../components/NotebookTree';

class NotebookTreeContainer extends Component {
  render() {
    return (
			<Nav {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {
    entities,
		router,
  } = state;
	const rootNotebookIds = Object.keys(entities.notebooks)
		.filter(id => !entities.notebooks[id].parentNotebookId);
  return {
    rootNotebookIds,
    notebooks: entities.notebooks,
		tagIds: Object.keys(entities.tags),
		...router.params,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...NotebookActions, ...RouterActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookTreeContainer);
