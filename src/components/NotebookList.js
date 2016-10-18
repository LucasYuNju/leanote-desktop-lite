import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import List from '../components/List';
import ListItem from '../components/ListItem';
import makeSelectable from '../components/makeSelectable';

const SelectableList = makeSelectable(List);

class NotebookList extends Component {
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

  handleItemSelect = (value) => {
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
    const icon = hasSublist ? 'folder' : 'document';

    return (
      <ListItem
        key={notebook.NotebookId}
        icon={icon}
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
          icon="tag"
        >
        </ListItem>
        <ListItem
          value="starred"
          text="Starred"
          icon="star"
        >
        </ListItem>
        {notebooks[rootNotebookId].ChildIds.map(childId => this.renderNotebook(notebooks[childId]))}
      </SelectableList>
    );
  }
}

export default NotebookList;
