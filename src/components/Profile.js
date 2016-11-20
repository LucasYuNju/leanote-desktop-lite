import React, { Component, PropTypes } from 'react';
import Menu from '../util/SystemMenu';

import Icon from '../components/Icon';

const { ipcRenderer } = require('electron');

class User extends Component {
  static propTypes = {
    email: PropTypes.string,
    username: PropTypes.string.isRequired,
    logo: PropTypes.string,
  };

  static defaultProps = {
    logo: 'http://leanote.com/images/blog/default_avatar.png'
  };

  handleClick = (event) => {
    if (!this.menu) {
      const template = [
        {
          label: 'Sign out',
          click: () => {
            ipcRenderer.send('auth-requested');
          },
        },
      ];
      this.menu = new Menu(template);
    }
    this.menu.popup(event);
  }

  render() {
    return (
      <div
        className="user-info"
        onClick={this.handleClick}
      >
				<div className="info">
					<span className="email">{this.props.email}</span>
					<Icon iconName="chevron-down"/>
				</div>
      </div>
    );
  }
}

export default User;
