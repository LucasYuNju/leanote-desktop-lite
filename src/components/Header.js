import React, { Component } from 'react';
import { connect } from 'react-redux';

const remote = require('electron').remote;

class Header extends Component {
  handleTitleBarDoubleClick() {
    const window = remote.getCurrentWindow();
    window.minimize();
  }

  render() {
    return (
      <header className="title-bar" onDoubleClick={this.handleTitleBarDoubleClick} />
    );
  }
}

export default Header;
