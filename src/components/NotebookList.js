import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import List from '../components/List';
import ListItem from '../components/ListItem';
import makeSelectable from '../components/makeSelectable';

const SelectableList = makeSelectable(List);

class NotebookList extends Component {
  static propTypes = {
    index: PropTypes.object.isRequired,
    rootNotebook: PropTypes.object.isRequired,
    selectNotebook: PropTypes.func.isRequired,
  };

  static defaultProps = {
  };

  state = {
    selected: null,
  };

  handleItemSelect = (value) => {
    this.setState({
      selected: value,
    });
    if (value !== 'tags' && value !== 'starred') {
      this.props.selectNotebook(value);
    }
  };

  renderNotebook = (notebook) => {
    const hasSublist = notebook.ChildIds.length > 0;
    const icon = hasSublist ? 'folder' : 'document';

    return (
      <ListItem
        key={notebook.NotebookId}
        icon={icon}
        nestedItems={notebook.ChildIds.map(notebookId => this.renderNotebook(this.props.index.notebook[notebookId]))}
        text={notebook.Title}
        value={notebook.NotebookId}
      />
    );
  };

  render() {
    const {
      index,
      rootNotebook,
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
          icon="tags"
        >
        </ListItem>
        <ListItem
          value="starred"
          text="Starred"
          icon="star"
        >
        </ListItem>
        {rootNotebook.ChildIds.map(notebookId => this.renderNotebook(index.notebook[notebookId]))}
      </SelectableList>
    );
  }
}

export default NotebookList;
