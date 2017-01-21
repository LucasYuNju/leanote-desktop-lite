import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import Icon from '../components/Icon';
import Link from '../components/Link'
import List from '../components/List';
import NoteStackListItem from '../components/NoteStackListItem';
import makeSelectable from '../components/makeSelectable';
import Tree from '../components/Tree';

const SelectableList = makeSelectable(List);

class NoteStackList extends Component {
  static propTypes = {
    notebooks: PropTypes.object.isRequired,
    noteStackId: PropTypes.string,
    noteStackType: PropTypes.string,
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
      <List subHeader="Notebooks" className="note-stack-list">
        <div className="children">
          {rootNotebookIds.map(notebookId => this.renderNoteStack(notebooks[notebookId]))}
        </div>
      </List>
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

  renderNoteStack = (notebook) => {
    const hasSublist = notebook.subs.length > 0;
    const selected = this.props.noteStackId === notebook.notebookId && this.props.noteStackType === 'notebook';
    const nodeLabel = (
      <Link
        to={`/edit/notebook-${notebook.notebookId}`}
        onClick={this.handleNoteStackClick}
        className={classNames({ 'selected' : selected })}
      >
        {
          hasSublist > 0 ?
          <Icon iconName="chevron-right" className='collapse-icon' /> :
          <span className="collapse-icon-placeholder" />
        }
        <Icon iconName={classNames({ 'file-directory': hasSublist }, { 'repo': !hasSublist })} className="node-type-icon" />
        <span className="text">{notebook.title}</span>
      </Link>
    )
    return (
      <Tree
        defaultCollapsed={false}
        nodeLabel={nodeLabel}
        key={notebook.notebookId}
        id={notebook.notebookId}
      >
        {notebook.subs.map(notebookId => this.renderNoteStack(this.props.notebooks[notebookId]))}
      </Tree>
    );
    // <NoteStackListItem
    //   type="notebook"
    //   id={notebook.notebookId}
    //   icon={classNames({ 'file-directory': hasSublist }, { 'repo': !hasSublist })}
    //   nestedItems={notebook.subs.map(notebookId => this.renderNoteStack(this.props.notebooks[notebookId]))}
    //   text={notebook.title}
    // />
  };

  handleNoteStackClick = (event) => {

  };

  prevRender = () => {
    // <SelectableList
    //   className="notebooks"
    //   id={noteStackId}
    // >
    // 	<NoteStackListItem
    // 		type="latest"
    // 		id="latest"
    // 		text="Latest"
    // 		icon="history"
    // 	/>
    // 	<NoteStackListItem
    // 		id="notebook"
    // 		text="Notebooks"
    // 		icon="file-directory"
    // 		nestedItems={rootNotebookIds.map(notebookId => this.renderNoteStack(notebooks[notebookId]))}
    // 	/>
    // 	<NoteStackListItem
    // 		id="tags"
    // 		text="Tags"
    // 		icon="tag"
    // 		nestedItems={tagIds.map(this.renderTag)}
    // 	/>
    // </SelectableList>
  }
}

export default NoteStackList;
