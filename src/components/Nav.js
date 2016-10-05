import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import NavItem from '../components/NavItem';
import NotebooksContainer from '../containers/NotebooksContainer';
import { fetchNotebooks, selectNotebook } from '../actions/NotebookActions';

class Nav extends Component {
  state = {
    selected: null,
  };

  handleItemSelect = (event, value) => {
    this.setState({
      selected: value,
    });
  };

  render() {
    const { selected } = this.state;
    return (
      <nav>
        <NavItem
          value="notebook"
          text="Notebook"
          icon="fa-file-text-o"
          onChange={this.handleItemSelect}
          selected={selected === 'notebook'}
        >
          <NotebooksContainer />
        </NavItem>
        <NavItem
          value="tag"
          text="Tag"
          icon="fa-tag"
          onChange={this.handleItemSelect}
          selected={selected === 'tag'}
        >
          <span>Tag</span>
        </NavItem>        
      </nav>
    );
  }
}

export default Nav;
