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
    selectNoteList: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchNotebooks();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.selectedNoteList.id && !this.initialized) {
      this.initialized = true;
      if (nextProps.rootNotebookIds.length) {
        this.props.selectNoteList("notebooks", nextProps.rootNotebookIds[0]);
        return false;
      }
    }
    return true;
  }

  render() {
    const {
      notebooks,
      rootNotebookIds,
      selectedNoteList,
    } = this.props;
    return (
      <SelectableList
        className="notebooks"
        onChange={this.handleItemSelect}
        id={selectedNoteList.id}
      >
				<ListItem
					id="starred"
					text="Starred"
					icon="star"
				>
				</ListItem>
        <ListItem
          id="tags"
          text="Tags"
          icon="tag"
        >
        </ListItem>
				<ListItem
					id="notebook"
					text="Notebook"
					icon="repo"
					nestedItems={rootNotebookIds.map(notebookId => this.renderNotebook(notebooks[notebookId]))}
				/>
      </SelectableList>
    );
  }

	renderTag = (tag) => {

	};

  renderNotebook = (notebook) => {
    const hasSublist = notebook.subs.length > 0;
    return (
      <ListItem
        id={notebook.notebookId}
        icon={classNames({ 'file-directory': hasSublist }, { repo: !hasSublist })}
        nestedItems={notebook.subs.map(notebookId => this.renderNotebook(this.props.notebooks[notebookId]))}
        text={notebook.title}
        noteList={{ type: "notebooks", id: notebook.notebookId }}
      />
    );
  };

  handleItemSelect = (item) => {
		console.log(item.props.noteList);
		this.props.selectNoteList(item.props.noteList);
  };
}

export default NotebookList;
