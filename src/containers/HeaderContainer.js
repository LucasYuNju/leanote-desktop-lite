import React, { Component } from 'react';

const remote = require('electron').remote;

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.onTitleBarDblClicked = this.onTitleBarDblClicked.bind(this);
  }

  onTitleBarDblClicked() {
    const window = remote.getCurrentWindow();
    window.minimize();
  }

  render() {
    return (
      <header className="title-bar" onDoubleClick={this.onTitleBarDblClicked}></header>
    );
  }
}

export default HeaderContainer;
