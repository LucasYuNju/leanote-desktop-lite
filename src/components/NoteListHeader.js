import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';
import SystemMenu from '../util/SystemMenu';

class NoteListHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  state = {
    
  };

  render() {
    const {
      title,
    } = this.props;
    return (
      <div className="note-list-header">
        <span className="title">{title}</span>
        <Icon iconName="list-unordered" />
      </div>
    );
  }
  
  handleSortButtonClick = () => {
    if (!this.menu) {
      this.menu = new SystemMenu([
        {
          // label:
        },
        {
          
        },
      ]);
    }
    this.menu.popup();
  };
}

export default NoteListHeader;
