import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon from '../components/Icon';
import SearchBox from '../components/SearchBox';
import TitleBar from '../components/TitleBar';

class Header extends Component {
  render() {
    return (
      <TitleBar className="header">
        <SearchBox />
        <Icon iconName="loop-circular" />
      </TitleBar>
    );
  }
}

export default Header;
