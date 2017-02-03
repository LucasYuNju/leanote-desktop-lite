import React, { Component, PropTypes } from 'react';
import { persistor } from 'redux-persist';

import Icon from '../components/Icon';
import UpdateDialog from '../components/UpdateDialog';
import emitter from '../util/emitter';
import Menu from '../util/SystemMenu';

const DEFAULT_AVATAR = 'http://leanote.com/images/blog/default_avatar.png';

class User extends Component {
  static propTypes = {
    fetchInfo: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string,
      username: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      logo: PropTypes.string,
    }),
  };

  handleClick = (event) => {
    if (!this.menu) {
      const template = [
        {
          label: 'Sign out',
          click: () => this.props.logout(),
        },
      ];
      this.menu = new Menu(template);
    }
    this.menu.popup(event, false);
  }

  render() {
    const { user } = this.props;
    return (
      <div
        className="user-info"
        onClick={this.handleClick}
      >
        <img src={user.logo ? user.logo : DEFAULT_AVATAR} />
        <div className="info">
          <p className="name">{user.username}</p>
          <p className="email">{user.email}</p>
        </div>
        <Icon iconName="gear"/>
      </div>
    );
  }

	componentDidMount() {
		if (!this.props.user.logo) {
			this.props.fetchInfo(this.props.user.userId);
		}
    setTimeout(() => {
      const ipcRenderer = require('electron').ipcRenderer;
      ipcRenderer.send('check-update');
      ipcRenderer.on('update-found', (event, msg) => {
        console.log('update found', msg);
        const callback = () => {
          if (msg.isPatch) {
            console.log('patch update');
            ipcRenderer.send('patch-update');
          } else {
            const RELEASES_URL = 'https://github.com/LucasYuNju/leanote-desktop-lite/releases';
            require('electron').remote.shell.openExternal(RELEASES_URL);
          }
        }
        emitter.emit('show-dialog', <UpdateDialog callback={callback} title="Update Available" message={msg} />);
      });
    }, 1000);
	}
}

export default User;
