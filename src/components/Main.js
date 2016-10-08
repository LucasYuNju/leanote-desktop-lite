import React, { Component, PropTypes } from 'react';

import Header from '../components/Header';
import NavContainer from '../containers/NavContainer';
import NotesContainer from '../containers/NotesContainer';
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
          <NavContainer />
          <NotesContainer />
        </div>
      </div>
    );
  }
}

export default Main;
