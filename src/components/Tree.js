import React, { cloneElement, Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';

/**
 * 支持点击展开和隐藏
 * 支持按层次自动padding
 */

class Tree extends Component {
  static propTypes = {
    children: PropTypes.array,
    defaultCollapsed: PropTypes.bool,
    itemClassName: PropTypes.string,
    nodeLabel: PropTypes.element.isRequired,
    nestedLevel: PropTypes.number,
    initialPadding: PropTypes.number,
    paddingPerLevel: PropTypes.number,
  };

  static defaultProps = {
    defaultCollapsed: true,
    initialPadding: 10,
    nestedLevel: 0,
    paddingPerLevel: 18,
  };

  state = {
    collapsed: this.props.defaultCollapsed,
  };

  handleClick = (...args) => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  }

  renderChild = (child) => {
    if (child.type === Tree) {
      return cloneElement(child, {
        nestedLevel: this.props.nestedLevel + 1,
      })
    }
    return child;
  }

  render() {
    const { children, itemClassName, nodeLabel, ...rest } = this.props;
    return (
      <div className="tree">
        <div
          className={classNames('tree-item', { 'collapsed': this.state.collapsed }, itemClassName)}
          onClick={this.handleClick}
        >
          {cloneElement(nodeLabel, { style: getStyles(this.props).item })}
        </div>
        <div className={classNames('tree-children', { 'collapsed': this.state.collapsed })}>
          {children.map(this.renderChild)}
        </div>
      </div>
    );
  }
}

function getStyles(props) {
  return {
    item: {
      paddingLeft: props.initialPadding + props.nestedLevel * props.paddingPerLevel
    }
  }
}

export default Tree;
