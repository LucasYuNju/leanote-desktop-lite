import React, { Component, PropTypes } from 'react';
import Menu from '../util/SystemMenu';

import Icon from '../components/Icon';

const { ipcRenderer } = require('electron');

const DEFAULT_LOGO = 'http://leanote.com/images/blog/default_avatar.png';

class User extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      username: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      logo: PropTypes.string,
    }),
    fetchInfo: PropTypes.func.isRequired,
  };

  handleClick = (event) => {
    if (!this.menu) {
      const template = [
        {
          label: 'Sign out',
          click: () => {
            ipcRenderer.send('auth-request');
          },
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
        <img src={user.logo ? user.logo : DEFAULT_LOGO} />
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
	}
}

export default User;
