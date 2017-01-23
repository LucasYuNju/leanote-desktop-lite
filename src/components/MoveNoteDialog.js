import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';
import Link from '../components/Link'
import List from '../components/List';
import Tree from '../components/Tree';

class MoveNoteDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    notebooks: PropTypes.object.isRequired,
    rootNotebookIds: PropTypes.array.isRequired,
  };

  static defaultProps = {
    onClose: () => {},
  };

  render() {
    const {
      notebooks,
      rootNotebookIds,
    } = this.props;
    return (
      <div className="move-note-dialog">
        <div className="notebook-tree">
          <h4>Move 1 note</h4>
          <hr />
          {rootNotebookIds.map(notebookId => this.renderNotebook(notebooks[notebookId]))}
        </div>
        <div className="buttons">
          <div className="btn dialog-btn" onClick={this.handleMoveButtonClick}>Move</div>
          <div className="btn dialog-btn" onClick={this.handleCancelButtonClick}>Cancel</div>
        </div>
      </div>
    );
  }

  renderNotebook = (notebook) => {
    const hasSublist = notebook.subs.length > 0;
    const selected = this.props.noteStackId === notebook.notebookId && this.props.noteStackType === 'notebook';
    const nodeLabel = (
      <div
        to={`/edit/notebook-${notebook.notebookId}`}
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

  handleNotebookClick = () => {

  }

  handleCancelButtonClick = () => {
    this.props.onClose();
  };

  handleMoveButtonClick = () => {
    this.props.onClose();
  };
}

export default MoveNoteDialog;
