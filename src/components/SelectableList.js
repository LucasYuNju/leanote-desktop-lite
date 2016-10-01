import React, { Component, PropTypes } from 'react';
import List from './List';

class SelectableList extends List {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
  }
  
  handleItemClick = (event, item) => {
    const value = item.props.value;
    if (value !== this.props.value) {
      this.props.onChange(event, value);
    }
  };

  extendChild(child) {
    return React.cloneElement(child, {
      onClick: (event) => {
        this.handleItemClick(event, child);
        if (child.props.onClick) {
          child.props.onClick(event);
        }
      },
      key: this.keyIndex++,
      selected: this.isChildSelected(child, this.props),
      nestedItems: child.props.nestedItems.map((child) => this.extendChild(child)),
    });
  }

  isChildSelected(child, props) {
    return props.value === child.props.value;
  }
  
  render() {
    this.keyIndex = 0;
    return (
      <List>
        {React.Children.map(this.props.children, child => this.extendChild(child))}
      </List>
    )
  }
}

export default SelectableList;
