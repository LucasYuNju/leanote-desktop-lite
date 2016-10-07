import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import TimeFormatUtil from '../util/TimeFormatUtil';

class Note extends Component {
  static propTypes = {
    content: PropTypes.string,
    starred: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.string,
    view: PropTypes.string,
    updatedTime: PropTypes.object,
  };

  static defaultProps = {
    view: 'snippet',
  };

  static selectable = true;

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const {
      content,
      className,
      title,
      updatedTime,
    } = this.props;
    const snippet = content.substring(0, 60);
    const formattedTime = TimeFormatUtil.fromNow(updatedTime);
    return (
      <div
        className={classNames('note-list-item', className)}
        onClick={this.handleClick}
      >
        <div className="header">
          <span className="title">{title}</span>
          <span className="updated-time">{formattedTime}</span>
        </div>
        <span className="snippet">{snippet}</span>
      </div>
    );
  }
}

export default Note;
