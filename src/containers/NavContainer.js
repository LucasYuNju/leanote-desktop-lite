import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import NavItem from '../components/NavItem';
import NotebookList from '../components/NotebookList';
import { fetchNotebooks, selectNotebook } from '../actions/NotebookActions';

class NavContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    notebooks: PropTypes.object,
  };

  state = {
    selected: null,
    expanded: null,
  };

  componentDidMount() {
    this.props.dispatch(fetchNotebooks());
  }

  handleHeaderClick = (event, value) => {
    this.setState({
      selected: value,
      expanded: value,
    });
  };

  handleListSelect = (event, notebookId) => {
    this.props.dispatch(selectNotebook(notebookId));
    this.setState({
      selected: null,
    });
  };

  render() {
    return (
      <nav>
        <NavItem
          value="notebook"
          text="Notebook"
          icon="fa-file-text-o"
          onClick={this.handleHeaderClick}
          expanded={this.state.expanded === 'notebook'}
          selected={this.state.selected === 'notebook'}
        >
          <NotebookList
            clearSelection={this.state.selected !== null}
            notebooks={this.props.notebooks}
            onChange={this.handleListSelect}
            rootId="root"
          />
        </NavItem>
        <NavItem
          value="tag"
          text="Tag"
          icon="fa-tag"
          onClick={this.handleHeaderClick}
          expanded={this.state.expanded === 'tag'}
          selected={this.state.selected === 'tag'}
        >
          <span>Tag</span>
        </NavItem>        
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    notebooks: state.notebooks,
    selectedNotebookId: state.selectedNotebookId,
  }
}

export default connect(mapStateToProps)(NavContainer);
