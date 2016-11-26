import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import List from '../components/List';
import NoteStackListItem from '../components/NoteStackListItem';
import makeSelectable from '../decorators/makeSelectable';

const SelectableList = makeSelectable(List);

class NoteStackList extends Component {
  static propTypes = {
    notebooks: PropTypes.object.isRequired,
    noteListId: PropTypes.string,
		rootNotebookIds: PropTypes.array.isRequired,
		selectNoteList: PropTypes.func.isRequired,
		tagIds: PropTypes.array.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
		// select first notebook by default
    if (!nextProps.noteListId && nextProps.rootNotebookIds.length) {
      nextProps.selectNoteList(nextProps.rootNotebookIds[0]);
      return true;
    }
    return true;
  }

  render() {
    const {
      notebooks,
      rootNotebookIds,
      noteListId,
			tagIds,
    } = this.props;
    return (
      <SelectableList
        className="notebooks"
        id={noteListId}
      >
				<NoteStackListItem
					type="latest"
					id="latest"
					text="Latest"
					icon="history"
          noteList={{ type: 'generatedNoteLists', id: 'latest' }}
				>
				</NoteStackListItem>
        <NoteStackListItem
          id="tags"
          text="Tags"
          icon="tag"
					nestedItems={tagIds.map(this.renderTag)}
        >
        </NoteStackListItem>
				<NoteStackListItem
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
      <NoteStackListItem
				type="tags"
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
      <NoteStackListItem
				type="notebooks"
        id={notebook.notebookId}
        icon={classNames({ 'file-directory': hasSublist }, { 'repo': !hasSublist })}
        nestedItems={notebook.subs.map(notebookId => this.renderNotebook(this.props.notebooks[notebookId]))}
        text={notebook.title}
        noteList={{ type: 'notebooks', id: notebook.notebookId }}
      />
    );
  };

	componentDidMount() {
		this.props.fetchNotebooks();
	}
}

export default NoteStackList;
