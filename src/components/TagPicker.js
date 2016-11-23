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
			<div className="tag-picker-container" onClick={this.toggleOpen}>
				<div className="btn btn-tool-bar">
					<Icon iconName="tag" />
						{this.state.open ? <div className="triangle" /> : null}
						{this.state.open ? <div className="triangle-smaller" /> : null}
						{this.state.open ? <TagPickerPopoverContainer /> : null}
				</div>
			</div>
    );
  }

	toggleOpen = () => {
		this.setState({
			open: !this.state.open,
		});
	}
}

export default TagPicker;
