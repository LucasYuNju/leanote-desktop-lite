import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import DialogWrapper from '../components/DialogWrapper';
import NavContainer from '../containers/NavContainer';
import NoteContainer from '../containers/NoteContainer';
import NoteListContainer from '../containers/NoteListContainer';
import * as SyncActions from '../actions/SyncActions';
import * as RouterActions from '../actions/RouterActions';

const { ipcRenderer } = require('electron');

class Main extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
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
		if (!this.props.token) {
      return null;
    }
		return (
			<div className="main-page">
				<HeaderContainer />
				<div className="content">
          <NavContainer />
					<NoteListContainer />
					<NoteContainer />
				</div>
        <DialogWrapper />
			</div>
		);
  }

  componentDidMount() {
    // 周期性地push
    setInterval(() => {
      this.props.dispatch(SyncActions.push());
    }, 5000);
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
  return {
    ...bindActionCreators({ ...SyncActions, ...RouterActions }, dispatch),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
