import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import NavItem from '../components/NavItem';
import NotebookList from '../components/NotebookList';
import { fetchNotebooks } from '../actions/NotebookActions';

class NavContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    notebooks: PropTypes.array,
  };

  state = {
    selected: null,
    expanded: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchNotebooks());
  }

  handleHeaderClick = (event, value) => {
    this.setState({
      selected: value,
      expanded: value,
    });
  };

  handleContentClick = (event, value) => {
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
            onChange={this.handleContentClick}
            clearSelection={this.state.selected !== null}
            notebooks={this.props.notebooks}
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
  }
}

export default connect(mapStateToProps)(NavContainer);
