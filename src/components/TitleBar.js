import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const remote = require('electron').remote;

/**
 * OSX title bar. 
 * Double click to minimize window, drag to move window.
 */
class TitleBar extends Component {
  static defaultProps = {
    className: '',
  };

  handleDoubleClick = (event) => {
    if (event.target === event.currentTarget) {
      const window = remote.getCurrentWindow();
      window.minimize();
    }
  };

  render() {
    const {
      children,
      className,
    } = this.props;
    return (
      <div 
        className={classNames('title-bar', className)} 
        onDoubleClick={this.handleDoubleClick}
      >
        {children}
      </div>
    );
  }
}

export default TitleBar;
