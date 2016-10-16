import React, { Component, PropTypes } from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import Nav from '../components/Nav';
import NoteContainer from '../containers/NoteContainer';
import NoteListContainer from '../containers/NoteListContainer';
import WindowUtil from '../util/WindowUtil';

class Main extends Component {
  componentDidMount() {
    WindowUtil.setProperties({
      resizable: true,
      width: 1000,
      height: 660,
    });
  }

  render() {
    return (
      <div className="main-page">
        <HeaderContainer />
        <div className="content">
          <Nav />
          <NoteListContainer />
          <NoteContainer />
        </div>
      </div>
    );
  }
}

export default Main;
