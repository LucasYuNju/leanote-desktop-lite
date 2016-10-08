import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchNotebooks, selectNotebook } from '../actions/NotebookActions';
import Nav from '../components/Nav';

class NavContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    notebooks: PropTypes.object,
  };

  componentDidMount() {
    this.props.dispatch(fetchNotebooks());
  }

  handleNotebookSelect = (event, notebookId) => {
    this.props.dispatch(selectNotebook(notebookId));
  };
  
  handleTagsSelect = (event) => {
    
  };

  handleStarredSelect = (event) => {
    
  };

  render() {
    return (
      <Nav
        notebooks={this.props.notebooks}
        onNotebookSelect={this.handleNotebookSelect}
        onStarredSelect={this.handleStarredSelect}
        onTagsSelect={this.handleTagsSelect}
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

export default connect(mapStateToProps)(NavContainer);
