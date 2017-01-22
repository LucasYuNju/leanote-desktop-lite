import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  }

  renderTitle = () => {
    if (this.props.title) {
      return (
        <div className="list-title">
          <span className="title">{this.props.title}</span>
          <span className="toggle">Hide</span>
        </div>
      )
    }
    return null;
  }

  render() {
    const {
      children,
      className,
      title,
      ...others
    } = this.props;

    return (
      <div {...others} className={classNames('list', className)}>
        {this.renderTitle()}
        {this.props.children}
      </div>
    );
  }
}

export default List;
