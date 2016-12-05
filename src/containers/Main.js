import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import Match from '../components/Match';
import Nav from '../components/Nav';
import NoteContainer from '../containers/NoteContainer';
import NoteListContainer from '../containers/NoteListContainer';
import NoteStackListContainer from '../containers/NoteStackListContainer';
import ProfileContainer from '../containers/ProfileContainer';
import * as UserActions from '../actions/UserActions';
import * as NavigatorActions from '../actions/NavigatorActions';

const { ipcRenderer } = require('electron');

class Main extends Component {
  static propTypes = {
    token: PropTypes.string,
    userId: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    const { token, userId } = nextProps;
    if (token) {
      service.init(userId, token);
      setTimeout(() => {
        ipcRenderer.send('main-window-ready');
      });
    }
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
					<div className="nav">
						<NoteStackListContainer />
						<ProfileContainer />
					</div>
					<NoteListContainer />
					<NoteContainer />
				</div>
			</div>
		);
  }

	componentDidMount() {
		this.props.initNavigator();
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
  return bindActionCreators({ ...UserActions, ...NavigatorActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
