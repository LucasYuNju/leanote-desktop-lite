import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';

class NoteToolbar extends Component {
  static propTypes = {
    editMode: PropTypes.bool,
    toggleEditMode: PropTypes.func,
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
      title,
      toggleEditMode,
    } = this.props;
    return (
      <div className="note-toolbar">
        <div className="tags" />
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

export default NoteToolbar;
