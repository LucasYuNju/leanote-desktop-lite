import React, { Component, PropTypes } from 'react';

class List extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const {
      children,
      ...others
    } = this.props;

    return (
      <div {...others} className="lea-list">
        {this.props.children}
      </div>
    );
  }
}

export default List;
