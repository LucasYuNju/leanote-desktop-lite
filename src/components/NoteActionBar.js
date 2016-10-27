import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';

class NoteActionBar extends Component {
  static propTypes = {
    
  };
  
  state = {
    
  };
  
  render() {
    return (
      <div className="action-bar">
        <div className="tags" />
        <div className="osx-buttons actions">
          <div className="osx-button">
            <Icon iconName="pencil" />
          </div>
          <div className="osx-button">
            <Icon iconName="history" />
          </div>
          <div className="osx-button">
            <Icon iconName="trashcan" />
          </div>
        </div>
      </div>
    );
  }
}

export default NoteActionBar;
