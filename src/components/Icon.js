import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

// import 'open-iconic/font/css/open-iconic.css';

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
      <span
        className={classNames('icon', 'iconic', className, iconName + '-icon')}
        data-glyph={iconName}
        onClick={onClick}
        title={iconName}
        aria-hidden="true"
      />
  );
  }
}

export default Icon;
