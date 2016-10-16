import React, { Component, PropTypes } from 'react';
import Menu from '../util/SystemMenu';
import { hashHistory } from 'react-router';

import Icon from '../components/Icon';

class User extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    logo: PropTypes.string,
  };

  // TODO, alt img for user has no avatar.
  static defaultProps = {
    
  };

  handleClick = (event) => {
    this.menu.popup(event, false);
  }
  
  componentDidMount() {
    const template = [
      {
        label: 'Sign out',
        click: () => {
          hashHistory.push('/login');
        },
      },
    ];
    this.menu = new Menu(template);
  }

  render() {
    return (
      <div 
        className="user-info" 
        onClick={this.handleClick}
      >
        <img src={this.props.logo} />
        <span className="name">{this.props.username}</span>
        <Icon iconName="chevron-bottom"/>
      </div>
    );
  }
}

export default User;
