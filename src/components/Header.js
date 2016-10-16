import React, { Component } from 'react';
import { connect } from 'react-redux';

import SVGIcon from '../components/SVGIcon';
import SearchBox from '../components/SearchBox';
import TitleBar from '../components/TitleBar';

class Header extends Component {
  render() {
    return (
      <TitleBar className="header">
        <SearchBox />
        <SVGIcon svgName="loop-circular" />
      </TitleBar>
    );
  }
}

export default Header;
