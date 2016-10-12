import React, { Component, PropTypes } from 'react';

import NotebooksContainer from '../containers/NotebooksContainer';
import UserContainer from '../containers/UserContainer';

class Nav extends Component {
  static propTypes = {
    
  };
  
  static defaultProps = {
    
  };
  
  render() {
    return (
      <div className="nav">
        <NotebooksContainer />
        <UserContainer />
      </div>
    );
  }
}

export default Nav;
