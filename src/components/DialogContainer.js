/**
 * Electron的dialog组件，不支持在dialog中显示页面
 */
import emitter from '../util/emitter';

import React, { cloneElement, Component, PropTypes } from 'react';
import classNames from 'classnames';

class DialogContainer extends Component {
  state = {
    active: false,
  };

  /**
   * 监听emitter的'show-dialog'消息，将收到的element作为dialog内容显示
   * children的类型为PropTypes.element
   */
  componentWillMount() {
    emitter.on('show-dialog', (content, callback) => {
      if (!this.state.active) {
        this.content = content;
        this.callback = callback;
        this.setState({
          active: true,
        });
      }
    });
  }

  handleDialogClose = (message) => {
    if (this.state.active) {
      this.setState({
        active: false,
      });
      if (this.callback) {
        this.callback(message);
      }
      this.callback = null;
      this.content = null;
    }
  }

  render() {
    if (this.state.active) {
      return (
        <div className={classNames('dialog', { active: this.state.active })}>
          <div className="container">
            {cloneElement(this.content, { onClose: this.handleDialogClose })}
          </div>
        </div>
      );
    }
    return null;
  }
}

export default DialogContainer;
