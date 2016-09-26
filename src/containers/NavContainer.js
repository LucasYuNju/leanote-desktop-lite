import React, { Component } from 'react';

class NavContainer extends Component {
  render() {
    return (
      <nav>
        <span className="nav-item">Starred</span>
        <span className="nav-item">Tag</span>
        <span className="nav-item">Notebook</span>
      </nav>
    );
  }
}

export default NavContainer;
