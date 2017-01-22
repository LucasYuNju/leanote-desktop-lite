import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import Icon from '../components/Icon';
import Link from '../components/Link'
import List from '../components/List';

class TagList extends Component {
  static propTypes = {
    noteStackId: PropTypes.string,
    noteStackType: PropTypes.string,
    tagIds: PropTypes.array.isRequired,
  };

  render() {
    const {
      rootNotebookIds,
      noteStackId,
			tagIds,
    } = this.props;
    return (
      <List title="Tags" className="tag-list">
        <div className="children">
          {tagIds.map(this.renderTag)}
        </div>
      </List>
    );
  }

	renderTag = (tagId) => {
    const selected = this.props.noteStackType === 'tag' && this.props.noteStackId === tagId;
    return (
      <Link
        to={`/edit/tag-${tagId}`}
        className={classNames({ 'selected' : selected })}
        key={tagId}
      >
        <Icon iconName='tag' className="tag-icon" />
        <span className="text">{tagId}</span>
      </Link>
    );
	};
}

export default TagList;
