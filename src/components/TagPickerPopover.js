import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class TagPickerPopover extends Component {
  static propTypes = {
		linkTag: PropTypes.func.isRequired,
		noteTags: PropTypes.arrayOf(PropTypes.string).isRequired,
		allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
		unlinkTag: PropTypes.func.isRequired,
  };

  static defaultProps = {

  };

  render() {
		return (
			<div className="tag-picker-popover">

			</div>
		)
  }
}

export default TagPickerPopover;
