import React, { Component, PropTypes } from 'react';
import Menu from '../util/SystemMenu';
import { hashHistory } from 'react-router';

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
      <div className="user-info" onClick={this.handleClick}>
        <img src={this.props.logo} />
        <span className="name">{this.props.username}</span>
        <span className="icon">
          <i className="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </div>
    );
  }
}

export default User;
