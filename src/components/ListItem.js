import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import NestedList from './NestedList';

function getStyles(props, state) {
  const styles = {
    // Extra styles so that ripples will span the entire container
    innerDiv: {
      paddingLeft: 16 + props.nestedLevel * 12,
    }
  };
  return styles;
}

class ListItem extends Component {
  static propTypes = {
    iconClass: PropTypes.string,
    nestedItems: PropTypes.arrayOf(PropTypes.element),
    nesetdLevel: PropTypes.number,
    onClick: PropTypes.func,
    text: PropTypes.string,
  };

  static defaultProps = {
    nestedItems: [],
    nestedLevel: 0,
    onClick: () => {},
    open: false,
  };

  static selectable = true;

  state = {
    open: this.props.open,
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
      );
    }
  }

  render() {
    const {
      children,
      className,
      iconClass,
      nestedItems,
      nestedLevel,
      text,
    } = this.props;
    const nested = nestedItems.length > 0;
    
    const contentChildren = [children];
    
    if (iconClass) {
      const iconElement = (
        <span className="icon">
          <i className={classNames('fa', iconClass)} aria-hidden="true"></i>
        </span>
      );
      this.pushElement(contentChildren, iconElement);
    }
    
    const textElement = <span className="text">{text}</span>;
    this.pushElement(contentChildren, textElement);
    
    if (nested) {
      const expandIconElement = (
        <span className="expand-icon" onClick={this.handleLeftIconClick}>
          <i className={classNames('fa', this.state.open ? 'fa-angle-down' : 'fa-angle-right')} aria-hidden="true"></i>
        </span>
      );
      this.pushElement(contentChildren, expandIconElement);
    }

    const nestedElements = nested ? (
      <NestedList open={this.state.open} nestedLevel={nestedLevel}>
        {nestedItems}
      </NestedList>
    ) : undefined;

    return (
      <div>
        <div className={classNames('lea-list-item', className)}
          onClick={this.handleTextClick}
          onDoubleClick={this.handleLeftIconClick}
          style={getStyles(this.props, this.state).innerDiv}
        >
          {contentChildren}
        </div>
        {nestedElements}
      </div>
    )
  }
}

export default ListItem;
