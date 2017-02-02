import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class UpdateDialog extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const {
      title,
    } = this.props;
    return (
      <div className="update-dialog">
          <h4>{title}</h4>
        <div className="buttons">
          <div
            className={classNames('btn', 'dialog-btn')}
          >
            Download
          </div>
          <div
            className="btn dialog-btn"
          >
            Cancel
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateDialog;
