import React, { Component, PropTypes } from 'react';
import List from './List';

function getStyles(props, state) {
  const expandIconWidth = props.nestedItems.length ? 18 : 0;
  const styles = {
    // needed so that ripples will span the entire container
    innerDiv: {
      paddingLeft: 16 + props.nestedLevel * 18 - expandIconWidth,
    }
  };
  return styles;
}

class ListItem extends Component {
  static propTypes = {
    initiallyOpen: PropTypes.bool,
    nestedItems: PropTypes.arrayOf(PropTypes.element),
    nesetdLevel: PropTypes.number,
    onClick: PropTypes.func,
    primaryText: PropTypes.string,
    primaryTogglesNestedList: PropTypes.bool,
    secondaryText: PropTypes.string,
    selected: PropTypes.bool,
  };
  
  static defaultProps = {
    initiallyOpen: false,
    nestedItems: [],
    nestedLevel: 1,
    onClick: () => {},
    open: false,
    primaryTogglesNestedList: false,
    secondaryText: '',
    selected: false,
  };
  
  state = {
    open: this.props.open ? this.props.initiallyOpen : this.props.open,
  };
  
  handleLeftIconClick = (event) => {
    this.setState({
      open: !this.state.open,
    });
    event.stopPropagation();
  };
  
  handleTextClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }    
  }
  
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
      children,
      nestedItems,
      nestedLevel,
      primaryText,
      selected,
    } = this.props;
    
    const nestedList = nestedItems.length ? (
      <List open={this.state.open} nestedLevel={nestedLevel}>
        {nestedItems}
      </List>
    ) : undefined;
    
    const contentChildren = [children];

    if (nestedItems.length > 0) {
      const expandIcon = (
        <span className="expand-icon" onClick={this.handleLeftIconClick}>
          <i className={this.state.open ? 'fa fa-angle-down' : 'fa fa-angle-right'} aria-hidden="true"></i>
        </span>
      );
      this.pushElement(contentChildren, expandIcon);
    }

    const primaryTextElement = <span className="primary-text">{primaryText}</span>;
    this.pushElement(contentChildren, primaryTextElement);
    
    const styles = {
      paddingLeft: 25,
    }
    
    return (
      <div>
        <div className={'lea-list-item ' + (selected ? 'selected' : '')}
          onClick={this.handleTextClick}
          onDoubleClick={this.handleLeftIconClick}
          style={getStyles(this.props, this.state).innerDiv}
        >
          {contentChildren}
        </div>
        {nestedList}
      </div>
    )
  }
}

export default ListItem;
