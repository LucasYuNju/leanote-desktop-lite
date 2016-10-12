import React, { Component, PropTypes } from 'react';

class User extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  };

  // TODO, user has no avatar.
  static defaultProps = {
    
  };

  render() {
    return (
      <div className="user-info">
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
