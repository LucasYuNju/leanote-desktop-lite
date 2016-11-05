import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import List from '../components/List';
import ListItem from '../components/ListItem';
import makeSelectable from '../components/makeSelectable';

const SelectableList = makeSelectable(List);

class NotebookList extends Component {
  static propTypes = {
    notebookIndex: PropTypes.object.isRequired,
    rootNotebook: PropTypes.object.isRequired,
    selectNotebook: PropTypes.func.isRequired,
    selectedNoteList: PropTypes.object.isRequired,
  };
  
  componentDidMount() {
    this.props.fetchNotebooks();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      rootNotebook,
      selectedNoteList,
    } = nextProps;
    if (!nextProps.selectedNoteList.id && !this.defaultSelected) {
      this.defaultSelected = true;
      const defaultNotebookId = rootNotebook.Subs[0];
      if (defaultNotebookId) {
        this.props.selectNotebook(defaultNotebookId);
        return false;
      }
    }
    return true;
  }

  render() {
    const {
      notebookIndex,
      rootNotebook,
      selectedNoteList,
    } = this.props;
    return (
      <SelectableList
        className="notebooks"
        onChange={this.handleItemSelect}
        value={selectedNoteList.id}
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
        {rootNotebook.Subs.map(notebookId => this.renderNotebook(notebookIndex[notebookId]))}
      </SelectableList>
    );
  }
  
  handleItemSelect = (value) => {
    if (value !== 'tags' && value !== 'starred') {
      this.props.selectNotebook(value);
    }
  };

  renderNotebook = (notebook) => {
    const hasSublist = notebook.Subs.length > 0;
    const icon = hasSublist ? 'file-directory' : 'repo';

    return (
      <ListItem
        key={notebook.NotebookId}
        icon={icon}
        nestedItems={notebook.Subs.map(notebookId => this.renderNotebook(this.props.notebookIndex[notebookId]))}
        text={notebook.Title}
        value={notebook.NotebookId}
      />
    );
  };
}

export default NotebookList;
