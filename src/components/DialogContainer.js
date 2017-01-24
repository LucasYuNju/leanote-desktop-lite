/**
 * Electron的dialog组件，不支持在dialog中显示页面
 */
import emitter from '../util/emitter';

import classNames from 'classnames';
import React, { cloneElement, Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    const bg = this.state.active ? <div className="bg" /> : null;
    const content = this.state.active ? (
      <div className="content" key="contenet">
        {cloneElement(this.content, { closeDialog: this.handleDialogClose })}
      </div>
    ) : null;
    return (
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          className={classNames('dialog-container', { active: this.state.active })}
        >
          {bg}
          {content}
        </ReactCSSTransitionGroup>
    );
  }
}

export default DialogContainer;
