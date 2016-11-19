import React, { Component, PropTypes } from 'react';

import NotebookListContainer from '../containers/NotebookListContainer';

// deprecated
class Nav extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="nav">
        <NotebookListContainer />
      </div>
    );
  }
}

export default Nav;
