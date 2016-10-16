import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import NestedList from './NestedList';

import SVGIcon from '../components/SVGIcon';

function getStyles(props, state) {
  const styles = {
    // Extra styles so that ripples will span the entire container
    // TODO delete
    innerDiv: {
      paddingLeft: props.nestedLevel * 12 + 8,
    }
  };
  return styles;
}

class ListItem extends Component {
  static propTypes = {
    icon: PropTypes.string,
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

  toggleNestedList = (event) => {
    this.setState({
      open: !this.state.open,
    });
    event.stopPropagation();
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
    this.toggleNestedList(event);
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
      icon,
      nestedItems,
      nestedLevel,
      text,
    } = this.props;
    const hasNestedListItems = nestedItems.length > 0;
    
    const contentChildren = [children];
    
    if (icon) {
      const iconElement = (
        <SVGIcon svgName={icon} />
      );
      this.pushElement(contentChildren, iconElement);
    }
    
    const textElement = <span className="text">{text}</span>;
    this.pushElement(contentChildren, textElement);
    
    if (hasNestedListItems) {
      const expandIconElement = (
        <span className="expand-icon">
          <i className={'fa fa-angle-left'} aria-hidden="true"></i>
        </span>
      );
      this.pushElement(contentChildren, expandIconElement);
    }

    const nestedElements = hasNestedListItems ? (
      <NestedList
        open={this.state.open}
        nestedLevel={nestedLevel}
        className="nested-list"
      >
        {nestedItems}
      </NestedList>
    ) : undefined;

    const classes = classNames('list-item', { folder: hasNestedListItems }, { open:this.state.open }, className);

    return (
      <div className={classes}>
        <div
          className="content"
          onClick={this.handleClick}
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
