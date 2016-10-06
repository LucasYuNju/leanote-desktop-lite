import React, { Component } from 'react';
import { connect } from 'react-redux';

import TitleBar from '../components/TitleBar';

class Header extends Component {

  render() {
    return (
      <TitleBar className="header">
      </TitleBar>
    );
  }
}

export default Header;
