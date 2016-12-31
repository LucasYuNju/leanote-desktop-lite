import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import Match from '../components/Match';
import Nav from '../components/Nav';
import NoteContainer from '../containers/NoteContainer';
import NoteListContainer from '../containers/NoteListContainer';
import * as SyncActions from '../actions/SyncActions';
import * as NavigatorActions from '../actions/NavigatorActions';

const { ipcRenderer } = require('electron');

class Main extends Component {
  static propTypes = {
    syncIfNeeded: PropTypes.func.isRequired,
    token: PropTypes.string,
    userId: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    const { syncIfNeeded, token, userId } = nextProps;
    if (token) {
      syncIfNeeded();
      setTimeout(() => {
        ipcRenderer.send('main-window-ready');
      });
    }
  }

  componentWillMount() {
    this.props.initRouter();
  }

  render() {
    const { token } = this.props;
		if (!token) {
      return null;
    }
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

function mapStateToProps(state) {
  const {
    user,
  } = state;
  return {
    token: user.token,
    userId: user.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...SyncActions, ...NavigatorActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
