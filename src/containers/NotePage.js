import React, { Component } from 'react';

import HeaderContainer from './HeaderContainer';
import NavContainer from './NavContainer';

class NotePage extends Component {
  render() {
    return (
      <div className="note-page">
        <HeaderContainer />
        <div className="content">
          <NavContainer />
        </div>
      </div>
    );
  }
}

export default NotePage;
