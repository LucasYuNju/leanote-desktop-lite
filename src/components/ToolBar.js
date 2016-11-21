import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';

class ToolBar extends Component {
  static propTypes = {
		editMode: PropTypes.bool,
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
					<div className="btn btn-toolbar">
						<Icon iconName="history" />
					</div>
					<div className="btn btn-toolbar">
						<Icon iconName="trashcan" />
					</div>
				</div>
			</div>
    );
  }

	renderEditModeButton = () => {
		const {
			editMode,
			toggleEditMode,
		} = this.props;
		if (toggleEditMode) {
			return (
				<div
					onClick={this.toggleEditMode}
					className={classNames('btn', 'btn-toolbar', {active: editMode})}
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
