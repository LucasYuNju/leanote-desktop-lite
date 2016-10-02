import React, { Component } from 'react';
import HeaderContainer from './HeaderContainer';
import NavContainer from './NavContainer';
import NoteList from '../components/NoteList';

class NotePage extends Component {
  render() {
    return (
      <div className="note-page">
        <HeaderContainer />
        <div className="content">
          <NavContainer />
          <NoteList />
        </div>
      </div>
    );
  }
}

export default NotePage;
