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
    this.menu.popup(event, false);
  }

  render() {
    return (
      <div
        className="user-info"
        onClick={this.handleClick}
      >
        <img src={this.props.logo} />
        <div className="info">
          <p className="name">{this.props.username}</p>
          <p className="email">{this.props.email}</p>
        </div>
        <Icon iconName="gear"/>
      </div>
    );
  }
}

export default User;
