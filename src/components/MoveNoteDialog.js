import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';
import Link from '../components/Link'
import List from '../components/List';
import Tree from '../components/Tree';

class MoveNoteDialog extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    notebooks: PropTypes.object.isRequired,
    closeDialog: PropTypes.func.isRequired,
    rootNotebookIds: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  };

  state = {
    notebookId: null,
  }

  render() {
    const {
      notebooks,
      rootNotebookIds,
      title,
    } = this.props;
    return (
      <div className="move-note-dialog">
        <div className="notebook-tree">
          <h4>{title}</h4>
          {rootNotebookIds.map(notebookId => this.renderNotebook(notebooks[notebookId]))}
        </div>
        <div className="buttons">
          <div
            className={classNames('btn', 'dialog-btn', { 'btn-disabled': !this.state.notebookId })}
            onClick={this.handleMoveButtonClick}
          >
            Move
          </div>
          <div
            className="btn dialog-btn"
            onClick={this.handleCancelButtonClick}
          >
            Cancel
          </div>
        </div>
      </div>
    );
  }

  renderNotebook = (notebook) => {
    const hasSublist = notebook.subs.length > 0;
    const selected = this.state.notebookId === notebook.notebookId;
    const nodeLabel = (
      <div
        onClick={this.handleNotebookClick.bind(this, notebook)}
        className={classNames('link', { 'selected' : selected })}
      >
        {
          hasSublist > 0 ?
          <Icon iconName="chevron-right" className='collapse-icon' /> :
          <span className="collapse-icon-placeholder" />
        }
        <Icon iconName={classNames({ 'file-directory': hasSublist }, { 'repo': !hasSublist })} className="node-type-icon" />
        <span className="text">{notebook.title}</span>
      </div>
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

  handleNotebookClick = (notebook) => {
    if (notebook.subs.length === 0) {
      this.setState({
        notebookId: notebook.notebookId,
      });
    }
  }

  handleCancelButtonClick = () => {
    this.props.closeDialog();
  };

  handleMoveButtonClick = () => {
    if (this.state.notebookId) {
      this.props.callback({
        notebookId: this.state.notebookId,
      });
      this.props.closeDialog();
    }
  };
}

export default MoveNoteDialog;
