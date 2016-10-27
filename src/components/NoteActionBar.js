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
        <div className="actions">
          <Icon iconName="history" />
          <Icon iconName="trashcan" />
          <Icon iconName="pencil" />
        </div>
      </div>
    );
  }
}

export default NoteActionBar;