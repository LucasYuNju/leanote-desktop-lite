import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';

class NoteTitle extends Component {
  static propTypes = {
    editMode: PropTypes.bool,
    onChanging: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    toggleEditMode: PropTypes.func,
    title: PropTypes.string,
  };

  renderEditModeButton = () => {
    if (this.props.toggleEditMode) {
      return (
        <div
          onClick={this.props.toggleEditMode}
          className={classNames('osx-button', {active: this.props.editMode})}
        >
          <Icon iconName="pencil" />
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      onChange,
      title,
      toggleEditMode,
    } = this.props;
    return (
      <div className="title-bar">
        <input
          className="note-title"
          placeholder="Title your note"
          onChange={this.handleInputChange}
          onBlur={onChange}
          value={title}
        />
        <div className="osx-buttons actions">
          {this.renderEditModeButton()}
          <div className="osx-button">
            <Icon iconName="history" />
          </div>
          <div className="osx-button">
            <Icon iconName="trashcan" />
          </div>
        </div>
      </div>
    );
  }

  handleInputChange = (event) => {
    const input = event.currentTarget;
    this.props.onChanging(input.value);
  }
}

export default NoteTitle;
