import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchNotebooks } from '../actions/NotebookActions';
import HeaderContainer from '../containers/HeaderContainer';
import NavContainer from '../containers/NavContainer';
import NotesContainer from '../containers/NotesContainer';
import WindowUtil from '../util/WindowUtil';

class NotePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

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
          <NavContainer/>
          <NotesContainer/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state', state);
  return {};
}

export default connect(mapStateToProps)(NotePage);
