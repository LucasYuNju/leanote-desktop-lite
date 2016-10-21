import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as NotebookActionCreators from '../actions/NotebookActions';
import NotebookList from '../components/NotebookList';

class NotebookListContainer extends Component {
  static propTypes = {
    notebooks: PropTypes.object,
  };

  componentDidMount() {
    this.props.fetchNotebooks();
  }

  render() {
    return (
      <NotebookList
        notebooks={this.props.notebooks}
        onNotebookSelect={this.props.selectNotebook}
        onStarredSelect={this.props.selectNotebook}
        onTagsSelect={this.props.selectNotebook}
        rootId="root"
      />
    );
  }
}

function mapStateToProps(state) {
  // TODO return array here
  return {
    notebooks: state.index.notebook,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NotebookActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookListContainer);
