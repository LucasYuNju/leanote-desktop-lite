import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';
import ToolBarContainer from '../containers/ToolBarContainer';

const MAX_NUM_SUGGESTIONS = 8;

class TagBar extends Component {
  static propTypes = {
		addNoteTag: PropTypes.func.isRequired,
		notebookTitle: PropTypes.string,
    noteTags: PropTypes.arrayOf(PropTypes.string).isRequired,
		allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
		removeNoteTag: PropTypes.func.isRequired,
  };

  render() {
    const { noteTags, notebookTitle, title, toggleEditMode } = this.props;
    return (
      <div className="tag-bar">
				<div className="notebook">
					<Icon iconName="repo" />
					<span className="title">{notebookTitle}</span>
				</div>
				<div className="tags">
					<Icon iconName="tag" />
					{noteTags.filter(tag => tag !== '').map(tag => this.renderTag(tag))}
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
