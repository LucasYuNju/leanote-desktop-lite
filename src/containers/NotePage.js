import React, { Component } from 'react';

import HeaderContainer from './HeaderContainer';
import NavContainer from './NavContainer';

class NotePage extends Component {
  render() {
    return (
      <div className="note-page">
        <NavContainer />
        <div className="content">
          <HeaderContainer />
        </div>
      </div>
    );
  }
}

export default NotePage;
