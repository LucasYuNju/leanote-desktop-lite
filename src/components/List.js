import React, { Component, PropTypes } from 'react';

class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };
  
  static defaultProps = {
    className: '',
  }

  render() {
    const {
      children,
      className,
      ...others
    } = this.props;

    return (
      <div {...others} className={'lea-list ' + className}>
        {this.props.children}
      </div>
    );
  }
}

export default List;
