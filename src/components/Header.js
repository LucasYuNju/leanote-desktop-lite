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

  handleSyncClicked = () => {
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
        <SearchBox />
        <Icon
          className={classNames({ 'rotate': this.state.synchonizing })}
          iconName="loop-circular"
          onClick={this.handleSyncClicked}
        />
      </TitleBar>
    );
  }
}

export default Header;
