import React, { Component } from 'react';
import { connect } from 'react-redux';

import TitleBar from '../components/TitleBar';
import UserContainer from '../containers/UserContainer';

class Header extends Component {
  render() {
    return (
      <TitleBar className="header">
        <UserContainer />
      </TitleBar>
    );
  }
}

export default Header;
