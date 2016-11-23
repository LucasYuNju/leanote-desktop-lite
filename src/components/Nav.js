import React, { Component, PropTypes } from 'react';

import NoteStackListContainer from '../containers/NoteStackListContainer';
import ProfileContainer from '../containers/ProfileContainer';

// deprecated
class Nav extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="nav">
        <NoteStackListContainer />
				<ProfileContainer />
      </div>
    );
  }
}

export default Nav;
