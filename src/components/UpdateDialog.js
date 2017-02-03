import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import marked from 'marked';

class UpdateDialog extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    closeDialog: PropTypes.func,
    title: PropTypes.string.isRequired,
    message: PropTypes.object.isRequired,
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
          <div className="desc">
            {`There is a newer version(${message.nextVersion}) of Leanote Lite available. Update now?`}
          </div>
        </div>
        <div className="buttons">
          <div
            className={classNames('btn', 'dialog-btn')}
            onClick={this.handleDownloadButtonClick}
          >
            {message.isPatch ? 'Install' : 'Download'}
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
    this.props.callback();
  }
}

export default UpdateDialog;
