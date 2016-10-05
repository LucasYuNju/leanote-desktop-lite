import React, { Component, PropTypes } from 'react';

import TimeFormatUtil from '../util/TimeFormatUtil';

class Note extends Component {
  static propTypes = {
    content: PropTypes.string,
    starred: PropTypes.bool,
    title: PropTypes.string,
    view: PropTypes.string,
    updatedTime: PropTypes.object,
  };

  static defaultProps = {
    view: 'snippet',
  };

  render() {
    const snippet = this.props.content.substring(0, 60);
    const formattedTime = TimeFormatUtil.fromNow(this.props.updatedTime);
    return (
      <div className={this.props.selected ? 'note-list-item selected' : 'note-list-item'}>
        <div className="header">
          <span className="title">{this.props.title}</span>
          <span className="updated-time">{formattedTime}</span>
        </div>
        <span className="snippet">{snippet}</span>
      </div>
    );
  }
}

export default Note;
