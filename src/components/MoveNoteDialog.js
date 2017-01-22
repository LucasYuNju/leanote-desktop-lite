import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class MoveNoteDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    notes: PropTypes.arrayOf(PropTypes.string),
  };

  render() {
    return (
      <div className="move-note-dialog">
        <div className="notebook-tree">
          <h1>Move to notebook</h1>
        </div>
        <div className="buttons">
          {['Cancel', 'Move'].map(this.renderButton)}
        </div>
      </div>
    );
  }

  renderButton = (button) => {
    return (
      <div className="btn dialog-btn" key={button}>
        {button}
      </div>
    )
  }
}

export default MoveNoteDialog;
