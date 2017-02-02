import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const RELEASES_URL = 'https://github.com/LucasYuNju/leanote-desktop-lite/releases';

class UpdateDialog extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    closeDialog: PropTypes.func,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  };

  render() {
    const {
      message,
      title,
    } = this.props;
    return (
      <div className="update-dialog">
        <div className="msg">
          <h4>{title}</h4>
          <div>{message}</div>
        </div>
        <div className="buttons">
          <div
            className={classNames('btn', 'dialog-btn')}
            onClick={this.handleDownloadButtonClick}
          >
            Download
          </div>
          <div
            className="btn dialog-btn"
            onClick={this.handleCancelButtonClick}
          >
            Cancel
          </div>
        </div>
      </div>
    );
  }

  handleCancelButtonClick = () => {
    this.props.closeDialog();
  };

  handleDownloadButtonClick = () => {
    this.props.closeDialog();
    require('electron').remote.shell.openExternal(RELEASES_URL);
  }
}

export default UpdateDialog;
