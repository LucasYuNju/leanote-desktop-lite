import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Icon from '../components/Icon';
import SearchBox from '../components/SearchBox';
import TitleBar from '../components/TitleBar';

class Header extends Component {
  static propTypes = {
    sendChange: PropTypes.func.isRequired,
  };

  state = {
    synchonizing: false,
  }

  handleSyncClick = () => {
    this.props.sendChange();
    this.setState({
      synchonizing: true,
    });
    setTimeout(() => {
      this.setState({
        synchonizing: false,
      });
    }, 2000);
  };

  render() {
    return (
      <TitleBar className="header">
        <div className="group" />
        <div className="group">
          <div className="osx-button sync-button">
            <Icon
              className={classNames({ 'rotate': this.state.synchonizing }, 'sync-icon')}
              iconName="sync"
              onClick={this.handleSyncClick}
            />
          </div>
          <div className="osx-button create-note-button">
            <span className="text">
              Create Note
            </span>
            <Icon iconName="chevron-down" />
          </div>
        </div>
        <div className="group">
          <SearchBox/>
        </div>
      </TitleBar>
    );
  }
}

export default Header;
