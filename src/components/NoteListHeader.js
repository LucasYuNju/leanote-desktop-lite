import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';

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
}

export default NoteListHeader;
