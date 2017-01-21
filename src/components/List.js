import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    subHeader: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  }

  renderTitle = () => {
    if (this.props.subHeader) {
      return (
        <div className="sub-header">
          <span className="title">Notebooks</span>
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
      subHeader,
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
