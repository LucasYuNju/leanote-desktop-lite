import React, { Component, PropTypes } from 'react';

import Editor from '../components/RTEditor';
import Header from '../components/Header';
import Nav from '../components/Nav';
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
        <Header />
        <div className="content">
          <Nav />
          <NoteListContainer />
          <Editor />
        </div>
      </div>
    );
  }
}

export default Main;
