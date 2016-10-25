import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HeaderContainer from '../containers/HeaderContainer';
import Nav from '../components/Nav';
import NoteContainer from '../containers/NoteContainer';
import NoteListContainer from '../containers/NoteListContainer';
import * as UserActionCreators from '../actions/UserActions';

const { ipcRenderer } = require('electron');

class Main extends Component {
  static propTypes = {
    autologin: PropTypes.func.isRequired,
  };

  state = {
    authed: false,
  };

  componentWillMount() {
    this.props.autologin()
      .then(() => {
        this.setState({
          authed: true,
        });
      }, () => {
        ipcRenderer.send('auth-requested');
      });
  }

  render() {
    return this.state.authed ? (
      <div className="main-page">
        <HeaderContainer />
        <div className="content">
          <Nav />
          <NoteListContainer />
          <NoteContainer />
        </div>
      </div>
    ) : null;
  }

  componentDidUpdate() {
    console.log(new Date().getTime());
    setTimeout(() => {
      ipcRenderer.send('main-window-ready');
    });
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActionCreators, dispatch);
}

export default connect(() => ({}), mapDispatchToProps)(Main);
