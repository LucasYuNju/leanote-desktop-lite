import React, { Component, PropTypes } from 'react';

import NotebooksContainer from '../containers/NotebooksContainer';
import ProfileContainer from '../containers/ProfileContainer';

class Nav extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="nav">
        <NotebooksContainer />
        <ProfileContainer />
      </div>
    );
  }
}

export default Nav;
