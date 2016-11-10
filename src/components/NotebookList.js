import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import List from '../components/List';
import ListItem from '../components/ListItem';
import makeSelectable from '../components/makeSelectable';

const SelectableList = makeSelectable(List);

class NotebookList extends Component {
  static propTypes = {
    notebooks: PropTypes.object.isRequired,
    rootNotebookIds: PropTypes.array.isRequired,
    selectedNoteList: PropTypes.object.isRequired,
    selectNotebook: PropTypes.func.isRequired,
  };
  
  componentDidMount() {
    this.props.fetchNotebooks();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.selectedNoteList.id && !this.initialized) {
      this.initialized = true;
      if (nextProps.rootNotebookIds.length) {
        this.props.selectNotebook(nextProps.rootNotebookIds[0]);
        return false;
      }
    }
    return true;
  }

  render() {
    console.log(this.props);
    const {
      notebooks,
      rootNotebookIds,
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
        {rootNotebookIds.map(notebookId => this.renderNotebook(notebooks[notebookId]))}
      </SelectableList>
    );
  }

  renderNotebook = (notebook) => {
    const hasSublist = notebook.subs.length > 0;
    return (
      <ListItem
        key={notebook.notebookId}
        icon={classNames({ 'file-directory': hasSublist }, { repo: !hasSublist })}
        nestedItems={notebook.subs.map(notebookId => this.renderNotebook(this.props.notebooks[notebookId]))}
        text={notebook.title}
        value={notebook.notebookId}
      />
    );
  };
  
  handleItemSelect = (value) => {
    if (value !== 'tags' && value !== 'starred') {
      this.props.selectNotebook(value);
    }
  };
}

export default NotebookList;
