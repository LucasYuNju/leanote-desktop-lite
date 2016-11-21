import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';
import ToolBarContainer from '../containers/ToolBarContainer';

class TagBar extends Component {
  static propTypes = {
		note: PropTypes.object.isRequired,
		notebookTitle: PropTypes.string,
  };

  render() {
    const {
			note,
			notebookTitle,
      title,
      toggleEditMode,
    } = this.props;
    return (
      <div className="note-tags">
				<div className="notebook">
					<Icon iconName="repo" />
					<span className="title">{notebookTitle}</span>
				</div>
				<div className="tags">
					<Icon iconName="tag" />
					{note.tags ? note.tags.map(tag => this.renderTag(tag)) : null}
					<input placeholder="Click to add tag" />
				</div>
      </div>
    );
  }

	renderTag(tag) {
		return (
			<span className="tag" key={tag}>
				{tag}
			</span>
		);
	}
}

export default TagBar;
