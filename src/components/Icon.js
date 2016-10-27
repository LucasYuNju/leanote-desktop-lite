import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import 'octicons/octicons/octicons.css';

class Icon extends Component {
  static propTypes = {
    className: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    size: PropTypes.number,
  };

  static defaultProps = {
    onClick: () => {},
    size: 16,
  }

  render() {
    const {
      className,
      iconName,
      onClick,
      size,
    } = this.props;
    
    return (
      <span className={classNames('icon', 'octicon', 'octicon-' + iconName, className)} 
        onClick={onClick}
        title={iconName}
      />
    );
  }
}

export default Icon;
