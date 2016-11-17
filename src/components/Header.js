import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import objectId from 'objectid-browser';

import Icon from '../components/Icon';
import Match from '../components/Match';
import Menu from '../util/SystemMenu';
import SearchBox from '../components/SearchBox';
import TitleBar from '../components/TitleBar';

const Echo = (props) => {
  return (
    <div>
      <span>{props.noteListTitle}</span>
    </div>
  )
}

class Header extends Component {
  static propTypes = {
    createNote: PropTypes.func.isRequired,
    sendNotes: PropTypes.func.isRequired,
    updateNote: PropTypes.func.isRequired,
    notebookTitle: PropTypes.string,
    notebookId: PropTypes.string,
    userId: PropTypes.string,
  };

  state = {
    synchonizing: false,
  }

  handleSyncClick = () => {
    this.props.sendNotes();
    this.setState({
      synchonizing: true,
    });
    setTimeout(() => {
      this.setState({
        synchonizing: false,
      });
    }, 2000);
  };

  handleCreateButtonClicked = (event) => {
    if (!this.menu) {
      const template = [
        {
          label: 'Create Note',
          click: this.createNote.bind(this, null, false),
        },
        {
          label: 'Create Markdown Note',
          click: this.createNote.bind(this, null, true),
        },
      ];
      this.menu = new Menu(template);
    }
    this.menu.popup(event);
  };

  createNote = (event, isMarkdown = false) => {
    const note = {
      noteId: objectId(),
      title: '',
      tags:[],
      desc: '',
      content: '',
      notebookId: this.props.notebookId,
      isNew: true,
      fromUserId: this.props.userId,
      isMarkdown: isMarkdown,
      createdTime: new Date().toString(),
      updatedTime: new Date().toString(),
    };
    this.props.createNote(note, this.props.notebookId);
    this.props.updateNote(note);
  };

  render() {
    return (
      <TitleBar className="header">
        <div className="group">
          <div className="osx-buttons">
            <div className="osx-button sync-button">
              <Icon
                className={classNames({ 'rotate': this.state.synchonizing }, 'sync-icon')}
                iconName="sync"
                onClick={this.handleSyncClick}
              />
            </div>
          </div>
          <div className="osx-buttons">
            <div className="osx-button create-note-button" onClick={this.createNote}>
              <span className="text">
                Create Note
              </span>
            </div>
            <div className="osx-button dropdown-button" onClick={this.handleCreateButtonClicked}>
              <Icon iconName="chevron-down" />
            </div>
          </div>
        </div>
        <div className="group">
          <SearchBox />
        </div>
      </TitleBar>
    );
  }
}

export default Header;
