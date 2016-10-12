import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import List from '../components/List';
import ListItem from '../components/ListItem';
import makeSelectable from '../components/makeSelectable';

const SelectableList = makeSelectable(List);

class Nav extends Component {
  static propTypes = {
    notebooks: PropTypes.object,
    onNotebookSelect: PropTypes.func.isRequired,
    onStarredSelect: PropTypes.func.isRequired,
    onTagsSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notebooks: [],
    rootNotebookId: 'root',
  };

  state = {
    selected: null,
  };

  handleItemSelect = (event, value) => {
    this.setState({
      selected: value,
    });
    if (value !== 'tags' && value !== 'starred') {
      // notebook selected
      this.props.onNotebookSelect(value);
    }
  };
  
  renderNotebook = (notebook) => {
    const hasSublist = notebook.ChildIds.length > 0;
    const iconClass = hasSublist ? 'fa-folder-o' : 'fa-file-text-o';
    
    return (
      <ListItem
        key={notebook.NotebookId}
        iconClass={iconClass}
        nestedItems={notebook.ChildIds.map(childId => this.renderNotebook(this.props.notebooks[childId]))}
        text={notebook.Title}
        value={notebook.NotebookId}
      />
    );
  };

  render() {
    const {
      notebooks,
      rootNotebookId,
    } = this.props;
    return (
      <SelectableList
        className="notebooks"
        onChange={this.handleItemSelect}
        value={this.state.selected}
      >
        <ListItem
          value="tags"
          text="Tags"
          iconClass="fa-tag"
        >
        </ListItem>
        <ListItem
          value="starred"
          text="Starred"
          iconClass="fa-star-o"
        >
        </ListItem>
        {notebooks[rootNotebookId].ChildIds.map(childId => this.renderNotebook(notebooks[childId]))}
      </SelectableList>
    );
  }
}

export default Nav;
