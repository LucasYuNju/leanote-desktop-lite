import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';
import SystemMenu from '../util/SystemMenu';

class NoteListHeader extends Component {
  static propTypes = {
    order: PropTypes.object,
    sortNoteList: PropTypes.func.isRequired,
    title: PropTypes.string,
  };

  render() {
    const {
      title,
    } = this.props;
    return (
      <div className="note-list-header">
        <span className="title">{title}</span>
        <Icon
          iconName="list-unordered"
          onClick={this.handleSortButtonClick}
        />
      </div>
    );
  }

  handleSortButtonClick = (event) => {
    if (!this.menu) {
      this.menu = new SystemMenu([
        {
          label: 'by title',
          click: () => {
            this.props.sortNoteList('title');
          },
        },
        {
          label: 'by time',
          click: () => {
            this.props.sortNoteList('updatedTime');
          },
        },
      ]);
    }
    this.menu.popup(event);
  };
}

export default NoteListHeader;
