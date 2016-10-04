import React, { Component, PropTypes } from 'react';

class NavItem extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    text: PropTypes.string,
    value: PropTypes.string,
  };
  
  handleClick = (event) => {
    this.props.onClick(event, this.props.value);
  };
  
  render() {
    const {
      children,
      expanded,
      icon,
      selected,
      text,
    } = this.props;
    let content = null;
    if (expanded) {
      content = (
        <div className="content">
          {children}
        </div>
      )
    }
    return (
      <div className={selected ? "nav-item selected" : "nav-item"}>
        <div className="header" onClick={this.handleClick}>
          <span className="icon">
            <i className={"fa " + icon} aria-hidden="true"></i>
          </span>
          <span>{text}</span>
        </div>
        {content}
      </div>
    );
  }
}

export default NavItem;
