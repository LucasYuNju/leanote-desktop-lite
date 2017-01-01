import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import objectId from 'objectid-browser';

import Icon from '../components/Icon';
import Menu from '../util/SystemMenu';
import Navigator from '../components/Navigator';
import TitleBar from '../components/TitleBar';
import ToolBarContainer from '../containers/ToolBarContainer';
import ProfileContainer from '../containers/ProfileContainer';

class Header extends Component {
  static propTypes = {
    changePath: PropTypes.func.isRequired,
    createNote: PropTypes.func.isRequired,
    notebookId: PropTypes.string,
    sendNotes: PropTypes.func,
    updateNote: PropTypes.func.isRequired,
    userId: PropTypes.string,
  };

  render() {
    const { changePath } = this.props;
    return (
      <TitleBar className="header">
        {this.renderCreateButton()}
				<Navigator changePath={changePath} />
        <div className="placeholder" />
        <ToolBarContainer />
      </TitleBar>
    );
  }

	renderCreateButton() {
		return (
      <div className="create-note-buttons btns">
        <div
          className={classNames('btn', 'create-button')}
          onClick={this.createNote.bind(this, null, false)}
        >
          <img alt="compose" src="images/toolbar-compose@2x.png" />
        </div>
        <div
          className={classNames('btn', 'dropdown-button')}
          onClick={this.showMenu}
        >
          <Icon iconName="chevron-down" />
        </div>
      </div>
		);
	}

  showMenu = (event) => {
    if (!this.menu) {
      const template = [
        {
          label: 'Create Note',
          click: (event) => this.createNote.call(this, event, false),
        },
        {
          label: 'Create Markdown Note',
          click: (event) => this.createNote.call(this, event, true),
        },
      ];
      this.menu = new Menu(template);
    }
    this.menu.popup(event);
  };

  createNote = (event, isMarkdown = false) => {
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
      isMarkdown: isMarkdown,
    };
    this.props.createNote(note, this.props.notebookId);
    // this.props.updateNote(note);
  };
}

export default Header;
