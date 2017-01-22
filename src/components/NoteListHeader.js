import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import objectId from 'objectid-browser';

import Icon from '../components/Icon';
import SystemMenu from '../util/SystemMenu';

class NoteListHeader extends Component {
  static propTypes = {
    createNote: PropTypes.func.isRequired,
    notebookId: PropTypes.string,
    order: PropTypes.object.isRequired,
    sortNoteList: PropTypes.func.isRequired,
    title: PropTypes.string,
  };

  render() {
    const {
      showCreateButton,
      title,
    } = this.props;
    return (
      <div className="note-list-header">
        <div className="order-by" onClick={this.onOrderButtonClick}>
          By time
          <Icon iconName="triangle-down" />
        </div>
        {this.renderCreateNoteButton()}
      </div>
    );
  }

  renderCreateNoteButton = () => {
    if (this.props.notebookId) {
      return (
        <div className="create-note" onClick={this.onCreateButtonClick}>
          <img alt="compose" src="images/toolbar-compose@2x.png" />
        </div>
      );
    }
    return null;
  }

  onCreateButtonClick = (event) => {
    if (!this.props.notebookId) {
      console.error('notebook not specified');
      return;
    }
    const note = {
      noteId: objectId(),
      title: '',
      tags:[],
      desc: '',
      content: '',
      notebookId: this.props.notebookId,
      isNew: true,
      isMarkdown: true,
    };
    this.props.createNote(note);
  }

  onOrderButtonClick = (event) => {
    this.menu = new SystemMenu([
      {
        label: 'by title',
        type: 'checkbox',
        checked: this.props.order.key === 'title',
        click: () => {
          this.props.sortNoteList('title');
        },
      },
      {
        label: 'by time',
        type: 'checkbox',
        checked: this.props.order.key === 'updatedTime',
        click: () => {
          this.props.sortNoteList('updatedTime');
        },
      },
    ]);
    this.menu.popup(event);
  };
}

export default NoteListHeader;
