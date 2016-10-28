import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';

class NoteTitle extends Component {
  static propTypes = {
    editMode: PropTypes.bool,
    toggleEditMode: PropTypes.func,
    // title: PropTypes.string,
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
      toggleEditMode,
    } = this.props;
    return (
      <div className="action-bar">
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
}

export default NoteTitle;
