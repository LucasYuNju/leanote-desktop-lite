import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultCollapsed: PropTypes.bool,
    title: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    defaultCollapsed: false,
  };

  state = {
    collapsed: this.props.defaultCollapsed,
  };

  handleToggleClick = (e) => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  renderTitle = () => {
    if (this.props.title) {
      return (
        <div className="list-title">
          <span className="title">{this.props.title}</span>
          <span className="toggle" onClick={this.handleToggleClick}>{this.state.collapsed ? 'Show' : 'Hide'}</span>
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      children,
      className,
      defaultCollapsed,
      title,
      ...rest
    } = this.props;
    return (
      <div className={classNames('list', className)} {...rest}>
        {this.renderTitle()}
        <div className={classNames('list-children', { collapsed: this.state.collapsed })}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default List;
