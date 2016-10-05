import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchNotebooks } from '../actions/NotebookActions';
import HeaderContainer from '../containers/HeaderContainer';
import Nav from '../components/Nav';
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
      <div className="note-page">
        <HeaderContainer />
        <div className="content">
          <Nav />
          <NotesContainer />
        </div>
      </div>
    );
  }
}

export default Main;
