import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import List from '../components/List';
import NoteStackListItem from '../components/NoteStackListItem';
import makeSelectable from '../components/makeSelectable';

const SelectableList = makeSelectable(List);

class NoteStackList extends Component {
  static propTypes = {
    notebooks: PropTypes.object.isRequired,
    noteStackId: PropTypes.string,
		rootNotebookIds: PropTypes.array.isRequired,
		selectNoteStack: PropTypes.func.isRequired,
		tagIds: PropTypes.array.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
		// select first notebook by default
    if (!nextProps.noteStackId && nextProps.rootNotebookIds.length) {
      nextProps.selectNoteStack(nextProps.rootNotebookIds[0], false);
      return true;
    }
    return true;
  }

  render() {
    const {
      notebooks,
      rootNotebookIds,
      noteStackId,
			tagIds,
    } = this.props;
    return (
      <SelectableList
        className="notebooks"
        id={noteStackId}
      >
				<NoteStackListItem
					type="latest"
					id="latest"
					text="Latest"
					icon="history"
				/>
				<NoteStackListItem
					id="notebook"
					text="Notebooks"
					icon="file-directory"
					nestedItems={rootNotebookIds.map(notebookId => this.renderNotebook(notebooks[notebookId]))}
				/>
				<NoteStackListItem
					id="tags"
					text="Tags"
					icon="tag"
					nestedItems={tagIds.map(this.renderTag)}
				/>
      </SelectableList>
    );
  }

	renderTag = (tagId) => {
		return (
      <NoteStackListItem
				type="tag"
        id={tagId}
        icon="tag"
        text={tagId}
      />
    );
	};

  renderNotebook = (notebook) => {
    const hasSublist = notebook.subs.length > 0;
    return (
      <NoteStackListItem
				type="notebook"
        id={notebook.notebookId}
        icon={classNames({ 'file-directory': hasSublist }, { 'repo': !hasSublist })}
        nestedItems={notebook.subs.map(notebookId => this.renderNotebook(this.props.notebooks[notebookId]))}
        text={notebook.title}
      />
    );
  };
}

export default NoteStackList;
