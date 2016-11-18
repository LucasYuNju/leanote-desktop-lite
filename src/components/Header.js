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
  const styles = {
    display: 'inline-block',
    width: '400px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  return (
    <span style={styles} title={props[0]}>{props[0]}</span>
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
        <div className="group icons">
					<Icon
						className="back-icon"
						iconName="chevron-left"
					/>
					<Icon
						className="forward-icon"
						iconName="chevron-right"
					/>
					<Icon
            className={classNames({ 'rotate': this.state.synchonizing }, 'sync-icon')}
            iconName="sync"
            onClick={this.handleSyncClick}
          />
        </div>
        <div className="group">
          <Match
						component={Echo}
            pattern="/*"
          />
          <SearchBox />
        </div>
      </TitleBar>
    );
  }

	renderCreateButton() {
		return (
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
		);
	}
}

export default Header;
