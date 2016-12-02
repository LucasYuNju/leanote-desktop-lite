import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Link from '../Components/Link';
import TimeFormatUtil from '../util/TimeFormatUtil';

class NoteListItem extends Component {
  static propTypes = {
    content: PropTypes.string,
		id: PropTypes.string.isRequired,
		imgSrc: PropTypes.string,
		selected: PropTypes.bool,
    starred: PropTypes.bool,
    title: PropTypes.string,
    view: PropTypes.string,
    updatedTime: PropTypes.string,
  };

  static defaultProps = {
		selected: false,
    view: 'snippet',
  };

  getText(html) {
		// TODO possible bottleneck
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
			id,
      imgSrc,
			selected,
      title,
      updatedTime,
    } = this.props;
    const formattedTime = TimeFormatUtil.fromNow(updatedTime);
    return (
      <Link
        className={classNames('note-list-item', { selected: selected }, className)}
				to={id}
      >
        <div className="info">
          <div className="title">{title}</div>
          <div className="detail">
            <span className="updated-time">{formattedTime}</span>
            <span className="snippet">{this.getText(content)}</span>
          </div>
        </div>
        {this.renderThumbnail(imgSrc)}
      </Link>
    );
  }
}

export default NoteListItem;
