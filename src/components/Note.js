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

  getText(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContext || div.innerText || '';
    return text.substring(0, 100);
  }

  render() {
    const {
      content,
      className,
      title,
      updatedTime,
    } = this.props;
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
        <span className="snippet">{this.getText(content)}</span>
      </div>
    );
  }
}

export default Note;
