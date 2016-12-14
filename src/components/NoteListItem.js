import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Link from '../components/Link';
import { fromNow } from '../util/timeFormat';

class NoteListItem extends Component {
  static propTypes = {
    note: PropTypes.shape({
      abstract: PropTypes.string,
      content: PropTypes.string,
  		noteId: PropTypes.string.isRequired,
      title: PropTypes.string,
      updatedTime: PropTypes.string,
    }).isRequired,
    thumbnail: PropTypes.string,
    selected: PropTypes.bool,
    view: PropTypes.string,
  };

  static defaultProps = {
		selected: false,
    view: 'snippet',
  };

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
      note,
      className,
      thumbnail,
			selected,
    } = this.props;
    // TODO selected note
    // console.log('note list item redraw', note);
    return (
      <Link
        className={classNames('note-list-item', { selected: selected }, className)}
				to={note.noteId}
      >
        <div className="info">
          <div className="title">{note.title}</div>
          <div className="detail">
            <span className="updated-time">{fromNow(note.updatedTime)}</span>
            <span className="snippet">{note.abstract}</span>
          </div>
        </div>
        {this.renderThumbnail(thumbnail)}
      </Link>
    );
  }
}

export default NoteListItem;
