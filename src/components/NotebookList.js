import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import List from '../components/List';
import NotebookListItem from '../components/NotebookListItem';
import makeSelectable from '../components/makeSelectable';

const SelectableList = makeSelectable(List);

class NotebookList extends Component {
  static propTypes = {
    notebooks: PropTypes.object.isRequired,
    rootNotebookIds: PropTypes.array.isRequired,
    selectedNoteListId: PropTypes.string.isRequired,
		selectNoteList: PropTypes.func.isRequired,
		tagIds: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.fetchNotebooks();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.selectedNoteListId && !this.initialized) {
      this.initialized = true;
      if (nextProps.rootNotebookIds.length) {
        this.props.selectNoteList("notebooks", nextProps.rootNotebookIds[0]);
        return false;
      }
    }
    return true;
  }

  render() {
		console.log('notebookList props', this.props);
    const {
      notebooks,
      rootNotebookIds,
      selectedNoteListId,
			tagIds,
    } = this.props;
    return (
      <SelectableList
        className="notebooks"
        onChange={this.handleItemSelect}
        id={selectedNoteListId}
      >
				<NotebookListItem
					id="latest"
					text="Latest"
					icon="history"
          noteList={{ type: 'generatedNoteLists', id: 'latest' }}
				>
				</NotebookListItem>
        <NotebookListItem
          id="tags"
          text="Tags"
          icon="tag"
					nestedItems={tagIds.map(this.renderTag)}
        >
        </NotebookListItem>
				<NotebookListItem
					id="notebook"
					text="Notebooks"
					icon="file-directory"
					nestedItems={rootNotebookIds.map(notebookId => this.renderNotebook(notebooks[notebookId]))}
				/>
      </SelectableList>
    );
  }

	renderTag = (tagId) => {
		return (
      <NotebookListItem
        id={tagId}
        icon="tag"
        text={tagId}
        noteList={{ type: 'tags', id: tagId }}
      />
    );
	};

  renderNotebook = (notebook) => {
    const hasSublist = notebook.subs.length > 0;
    return (
      <NotebookListItem
        id={notebook.notebookId}
        icon={classNames({ 'file-directory': hasSublist }, { 'repo': !hasSublist })}
        nestedItems={notebook.subs.map(notebookId => this.renderNotebook(this.props.notebooks[notebookId]))}
        text={notebook.title}
        noteList={{ type: 'notebooks', id: notebook.notebookId }}
      />
    );
  };

  handleItemSelect = (item) => {
		// console.log(item.props.noteList);
		this.props.selectNoteList(item.props.noteList.type, item.props.noteList.id);
  };
}

export default NotebookList;
