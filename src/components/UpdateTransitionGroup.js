import React, { Component, PropTypes } from 'react';

/**
 * react-addons-css-transition-group仅仅为mount和unmount生命周期提供了钩子
 * UpdateTransitionGroup提供了对update声明周期的支持
 * 任何children必须带有key和id，UpdateTransitionGroup根据key判断是否发生mount，根据id判断是否发生更新
 */
class UpdateTransitionGroup extend Component {
  static propTypes = {
    transitionName: PropTypes.string.isRequired,
    transitionUpdateTimeout: PropTypes.number,
    children: PropTypes.node.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.element
    ),
    component: PropTypes.element,
  };

  static defaultProps = {
    component = <span />,
  };

  render() {
    const { children, component } = this.props;
    return (
        children
    )
  }
}

export default UpdateTransitionGroup;
