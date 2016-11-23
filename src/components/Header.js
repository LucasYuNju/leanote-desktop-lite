import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import objectId from 'objectid-browser';

import Icon from '../components/Icon';
import Menu from '../util/SystemMenu';
import SearchBar from '../components/SearchBar';
import TitleBar from '../components/TitleBar';
import ToolBarContainer from '../containers/ToolBarContainer';
import ProfileContainer from '../containers/ProfileContainer';

class Header extends Component {
  static propTypes = {
    createNote: PropTypes.func.isRequired,
		navigateBack: PropTypes.func.isRequired,
		navigateForward: PropTypes.func.isRequired,
		navigateBackEnabled: PropTypes.bool.isRequired,
		navigateForwardEnabled: PropTypes.bool.isRequired,
    notebookId: PropTypes.string,
    sendNotes: PropTypes.func,
    updateNote: PropTypes.func.isRequired,
    userId: PropTypes.string,
  };

  state = {
    synchonizing: false,
  }

  render() {
		const {
			navigateBack,
			navigateForward,
			navigateBackEnabled,
			navigateForwardEnabled,
		} = this.props;
    return (
      <TitleBar className="header">
				<SearchBar
					navigateBack={navigateBack}
					navigateForward={navigateForward}
					navigateBackEnabled={navigateBackEnabled}
					navigateForwardEnabled={navigateForwardEnabled}
				/>
        <ToolBarContainer />
      </TitleBar>
    );
  }

  renderSyncIcon() {
    return (
      <Icon
        className={classNames({ 'rotate': this.state.synchonizing }, 'sync-icon')}
        iconName="sync"
        onClick={this.handleSyncClick}
      />
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

  handleSyncClick = () => {
    // this.props.sendNotes();
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
}

export default Header;
