import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';
import TagPickerPopoverContainer from '../containers/TagPickerPopoverContainer';

class TagPicker extends Component {
  state = {
		open: false,
  };

  render() {
    return (
			<div className="tag-picker-container">
				<div className="btn btn-tool-bar" onMouseDown={this.togglePopover}>
					<Icon iconName="tag" />
				</div>
				{this.state.open ? <div className="triangle" /> : null}
				{this.state.open ? <div className="triangle-inner" /> : null}
				{this.state.open ? <TagPickerPopoverContainer hide={this.togglePopover}/> : null}
			</div>
    );
  }

	togglePopover = (e) => {
		e.preventDefault();
		this.setState({
			open: !this.state.open,
		});
	}
}

export default TagPicker;
