import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';

class ToolBar extends Component {
  static propTypes = {
		editMode: PropTypes.bool,
		isMarkdown: PropTypes.bool,
		noteId: PropTypes.string.isRequired,
		toggleEditMode: PropTypes.func,
  };

  static defaultProps = {
		editMode: 'preview',
  };

  render() {
    return (
			<div className="toolbar-container">
				<div className="toolbar-items">
					{this.renderEditModeButton()}
					<div className="btn btn-tool-bar">
						<Icon iconName="history" />
					</div>
					<div className="btn btn-tool-bar">
						<Icon iconName="trashcan" />
					</div>
				</div>
			</div>
    );
  }

	renderEditModeButton = () => {
		const {
			editMode,
			isMarkdown,
			toggleEditMode,
		} = this.props;
		if (isMarkdown) {
			return (
				<div
					onClick={this.toggleEditMode}
					className={classNames('btn', 'btn-tool-bar', {active: editMode})}
				>
					<Icon iconName="pencil" />
				</div>
			);
		}
		return null;
	}

	toggleEditMode = () => {
		this.props.toggleEditMode(this.props.noteId);
	}
}

export default ToolBar;
