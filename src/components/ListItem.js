import React, { Component, PropTypes } from 'react';
import NestedList from './NestedList';

function getStyles(props, state) {
  const expandIconWidth = props.nestedItems.length ? 18 : 0;
  const styles = {
    // Extra styles so that ripples will span the entire container
    innerDiv: {
      paddingLeft: 34 + props.nestedLevel * 12 - expandIconWidth,
    }
  };
  return styles;
}

class ListItem extends Component {
  static propTypes = {
    nestedItems: PropTypes.arrayOf(PropTypes.element),
    nesetdLevel: PropTypes.number,
    onClick: PropTypes.func,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    nestedItems: [],
    nestedLevel: 0,
    onClick: () => {},
    open: false,
    secondaryText: '',
  };

  static displayName = 'ListItem';

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
      )
    }
  }

  render() {
    const {
      children,
      nestedItems,
      nestedLevel,
      primaryText,
    } = this.props;

    const nestedList = nestedItems.length ? (
      <NestedList open={this.state.open} nestedLevel={nestedLevel}>
        {nestedItems}
      </NestedList>
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
        <div className={'lea-list-item ' + this.props.className}
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
