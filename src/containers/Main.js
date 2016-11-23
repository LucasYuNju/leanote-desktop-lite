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
import * as UserActionCreators from '../actions/UserActions';
import * as NavigatorActionCreators from '../actions/NavigatorActions';

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
        setTimeout(() => {
          ipcRenderer.send('main-window-ready');
        });
      }, () => {
        ipcRenderer.send('auth-requested');
      });
  }

  render() {
		if (this.state.authed) {
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
		return null;
  }

	componentDidMount() {
		this.props.initNavigator();
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...UserActionCreators, ...NavigatorActionCreators }, dispatch);
}

export default connect(() => ({}), mapDispatchToProps)(Main);
