import React, { Component, PropTypes } from 'react';
import List from './List';

class ListItem extends Component {
  static propTypes = {
    initiallyOpen: PropTypes.bool,
    nestedItems: PropTypes.arrayOf(PropTypes.element),
    onClick: PropTypes.func,
    primaryText: PropTypes.string,
    primaryTogglesNestedList: PropTypes.bool,
    secondaryText: PropTypes.string,
  };
  
  static defaultProps = {
    initiallyOpen: false,
    nestedItems: [],
    onClick: () => {},
    open: false,
    primaryTogglesNestedList: false,
    secondaryText: '',
  };
  
  state = {
    open: this.props.open ? this.props.initiallyOpen : this.props.open,
  };
  
  handleClick = (event) => {
    this.setState({
      open: !this.state.open,
    });
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };
  
  pushElement(children, element, additionalProps) {
    if (element) {
      children.push(
        React.cloneElement(element, {
          key: children.length,
          ...additionalProps,
        })
      )
    }
  }
  
  render() {
    const {
      nestedItems,
      onClick,
      primaryText,
      children,
    } = this.props;
    
    const nestedList = nestedItems.length ? (
      <List open={this.state.open}>
        {nestedItems}
      </List>
    ) : undefined;
    
    const contentChildren = [children];
    
    const primaryTextElement = <span className="primary-text">{primaryText}</span>;
    this.pushElement(contentChildren, primaryTextElement);
    
    if (nestedItems.length > 0) {
      const expandIcon = (
        <span className="expand-icon">
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      )
      this.pushElement(contentChildren, expandIcon);
    }
    
    return (
      <div>
        <div className="lea-list-item" onClick={this.handleClick}>
          {contentChildren}
        </div>
        {nestedList}
      </div>
    )
  }
}

export default ListItem;
