import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import Icon from '../components/Icon';
import Link from '../components/Link'
import List from '../components/List';

class TagList extends Component {
  static propTypes = {
    noteStackId: PropTypes.string,
    noteStackType: PropTypes.string,
    tags: PropTypes.object.isRequired,
  };

  render() {
    const {
      rootNotebookIds,
      noteStackId,
      tags,
    } = this.props;
    return (
      <List title="Tags" className="tag-list" defaultCollapsed={true}>
        <div className="children">
          {Object.keys(tags).map(this.renderTag)}
        </div>
      </List>
    );
  }

  renderTag = (tagId) => {
    const selected = this.props.noteStackType === 'tag' && this.props.noteStackId === tagId;
    const tag = this.props.tags[tagId];
    return (
      <Link
        to={`/edit/tag-${tagId}`}
        className={classNames('nav-item', { 'selected' : selected })}
        key={tagId}
      >
        <Icon iconName='tag' className="tag-icon" />
        <span className="text">{tagId}</span>
        <span className="badge">{tag.noteIds.length ? tag.noteIds.length : ''}</span>
      </Link>
    );
	};
}

export default TagList;
