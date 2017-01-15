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
				<Navigator changePath={changePath} />
        <div className="placeholder" />
        <ToolBarContainer />
      </TitleBar>
    );
  }

  // deprecated
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
}

export default Header;
