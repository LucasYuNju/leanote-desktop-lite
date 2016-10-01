import React, { Component, PropTypes } from 'react';

class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
  };
  
  static defaultProps = {
    open: true,
  }

  render() {
    const {
      children,
      open,
      ...others
    } = this.props;
    
    if (!open) {
      return null;
    }
    
    return (
      <div {...others} className="lea-list">
        {children}
      </div>
    );
  }
}

export default List;
