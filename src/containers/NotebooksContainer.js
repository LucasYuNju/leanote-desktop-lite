import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as NotebookActionCreators from '../actions/NotebookActions';
import Notebooks from '../components/Notebooks';

class NavContainer extends Component {
  static propTypes = {
    notebooks: PropTypes.object,
  };

  componentDidMount() {
    this.props.fetchNotebooks();
  }

  render() {
    return (
      <Notebooks
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
  return {
    notebooks: state.notebooks,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NotebookActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
