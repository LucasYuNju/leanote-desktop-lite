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
    toggleEditMode: PropTypes.func
  };

  static defaultProps = {
    editMode: 'preview'
  };

  render() {
    return (
      <div className="toolbar-container">
        <div className="toolbar-items">
          <TagPicker/>
          <div className="btn btn-tool-bar" onClick={this.deleteNote}>
            <Icon iconName="trashcan"/>
          </div>
          <div className="btn btn-tool-bar btn-disabled">
            <Icon iconName="info"/>
          </div>
          <div className="btn btn-tool-bar btn-disabled">
            <Icon iconName="history"/>
          </div>
        </div>
      </div>
    );
  }

  deleteNote = () => {
    emitter.emit('delete-note', this.props.note);
  }

	toggleEditMode = () => {
		this.props.toggleEditMode(this.props.note.noteId);
	}
}

export default ToolBar;
