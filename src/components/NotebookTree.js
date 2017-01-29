import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import Icon from '../components/Icon';
import Link from '../components/Link'
import List from '../components/List';
import Tree from '../components/Tree';

class NotebookTree extends Component {
  static propTypes = {
    notebooks: PropTypes.object.isRequired,
    noteStackId: PropTypes.string,
    noteStackType: PropTypes.string,
    rootNotebookIds: PropTypes.array.isRequired,
    selectNoteStack: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    // select first notebook by default
    // if (!nextProps.noteStackId && nextProps.rootNotebookIds.length) {
    //   nextProps.selectNoteStack(nextProps.rootNotebookIds[0], 'notebook', false);
    //   return false;
    // }
    return true;
  }

  renderNotebook = (notebook) => {
    const hasSublist = notebook.subs.length > 0;
    const selected = this.props.noteStackId === notebook.notebookId && this.props.noteStackType === 'notebook';
    const nodeLabel = (
      <Link
        to={`/edit/notebook-${notebook.notebookId}`}
        onClick={this.handleNoteStackClick.bind(this, notebook)}
        className={classNames('nav-item', { 'selected' : selected })}
      >
        <Icon iconName="chevron-right" className={classNames('collapse-icon', { 'disabled': !hasSublist } )} />
        <Icon iconName={classNames({ 'file-directory': hasSublist }, { 'repo': !hasSublist })} className="node-type-icon" />
        <span className="text">{notebook.title}</span>
        <span className="badge">{notebook.noteIds.length ? notebook.noteIds.length : ''}</span>
      </Link>
    )
    return (
      <Tree
        defaultCollapsed={false}
        nodeLabel={nodeLabel}
        key={notebook.notebookId}
        id={notebook.notebookId}
        itemClassName="notebook-tree-item"
      >
        {notebook.subs.map(notebookId => this.renderNotebook(this.props.notebooks[notebookId]))}
      </Tree>
    );
  };

  handleNoteStackClick = (notebook, event) => {
    if (notebook.subs.length > 0) {
      event.preventDefault();
    }
  };

  render() {
    const {
      notebooks,
      rootNotebookIds,
      noteStackId,
    } = this.props;
    return (
      <List title="Notebooks" className="notebook-list">
        {rootNotebookIds.map(notebookId => this.renderNotebook(notebooks[notebookId]))}
      </List>
    );
  }
}

export default NotebookTree;
