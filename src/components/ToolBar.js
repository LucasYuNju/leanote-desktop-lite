import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import emitter from '../util/emitter';
import Icon from '../components/Icon';
import TagPicker from '../components/TagPicker.js';

class ToolBar extends Component {
  static propTypes = {
    deleteNote: PropTypes.func.isRequired,
		editMode: PropTypes.bool,
		isMarkdown: PropTypes.bool,
		note: PropTypes.object.isRequired,
		toggleEditMode: PropTypes.func,
  };

  static defaultProps = {
		editMode: 'preview',
  };

  constructor(props, context) {
    super(props);
    console.log(props,context);
  }

  render() {
    return (
			<div className="toolbar-container">
				<div className="toolbar-items">
					{this.renderEditModeButton()}
					<TagPicker />
					<div className="btn btn-tool-bar">
						<Icon iconName="history" />
					</div>
					<div
            className="btn btn-tool-bar"
            onClick={this.deleteNote}
          >
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

  deleteNote = () => {
    emitter.emit('delete-note', this.props.note);
  }

	toggleEditMode = () => {
		this.props.toggleEditMode(this.props.note.noteId);
	}
}

export default ToolBar;
