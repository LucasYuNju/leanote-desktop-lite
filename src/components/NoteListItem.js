import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import TimeFormatUtil from '../util/TimeFormatUtil';

class NoteListItem extends Component {
  static propTypes = {
    content: PropTypes.string,
    starred: PropTypes.bool,
    title: PropTypes.string,
    view: PropTypes.string,
    updatedTime: PropTypes.object,
    imgSrc: PropTypes.string,
  };

  static defaultProps = {
    view: 'snippet',
  };

  // TODO remove this.
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

  renderThumbnail(imgSrc) {
		if (imgSrc) {
			return (
	      <div
	        className="thumbnail"
	        style={{backgroundImage: `url(${imgSrc})`}}
	      >
	      </div>
	    );
		}
		return null;
  }

  render() {
    const {
      content,
      className,
      imgSrc,
      title,
      updatedTime,
    } = this.props;
    const formattedTime = TimeFormatUtil.fromNow(updatedTime);
    return (
      <div
        className={classNames('note-list-item', className)}
        onClick={this.handleClick}
      >
        <div className="shim" />
        <div className="info">
          <div className="title">{title}</div>
          <div className="detail">
            <span className="updated-time">{formattedTime}</span>
            <span className="snippet">{this.getText(content)}</span>
          </div>
        </div>
        {this.renderThumbnail(imgSrc)}
      </div>
    );
  }
}

export default NoteListItem;
