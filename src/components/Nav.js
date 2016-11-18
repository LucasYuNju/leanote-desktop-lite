import React, { Component, PropTypes } from 'react';

import NotebookListContainer from '../containers/NotebookListContainer';
import ProfileContainer from '../containers/ProfileContainer';

// deprecated
class Nav extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="nav">
        <NotebookListContainer />
        <ProfileContainer />
      </div>
    );
  }
}

export default Nav;
