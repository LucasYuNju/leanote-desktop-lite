import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { fromNow } from '../util/timeFormat';
import { httpsToLeanote } from '../util/regex';
import Link from '../components/Link';
import Menu from '../util/SystemMenu';

class NoteListItem extends Component {
  static propTypes = {
    deleteNote: PropTypes.func.isRequired,
    note: PropTypes.shape({
      abstract: PropTypes.string,
      content: PropTypes.string,
  		noteId: PropTypes.string.isRequired,
      title: PropTypes.string,
      updatedTime: PropTypes.string,
    }).isRequired,
    selected: PropTypes.bool,
    thumbnail: PropTypes.string,
    view: PropTypes.string,
  };

  static defaultProps = {
		selected: false,
    view: 'snippet',
  };

  render() {
    const {
      note,
      className,
      thumbnail,
			selected,
    } = this.props;
    return (
      <Link
        className={classNames('note-list-item', { selected: selected }, className)}
				to={note.noteId}
        onContextMenu={this.showMenu}
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

  renderThumbnail(thumbnail) {
    if (thumbnail) {
      return (
        <div
          className="thumbnail"
          style={{backgroundImage: `url(${httpsToLeanote(thumbnail)})`}}
        >
        </div>
      );
    }
    return null;
  }

  showMenu = (event) => {
    if (!this.menu) {
      const template = [
        {
          label: 'Delete',
          click: (event) => {
            this.props.deleteNote(this.props.note);
          },
        }
      ];
      this.menu = new Menu(template);
    }
    this.menu.popup(event);
  }
}

export default NoteListItem;
