import React, {Component, Children, PropTypes} from 'react';
import classNames from 'classnames';

export const makeSelectable = (MyComponent) => {
  return class extends Component {
    static propTypes = {
      children: PropTypes.node,
      onChange: PropTypes.func,
      value: PropTypes.any,
    };

    extendChild = (child) => {
      if (child && child.type && child.type.selectable) {
        const selected = this.isChildSelected(child, this.props);
        const classes = selected ? 'selected' : '';
        
        return React.cloneElement(child, {
          onClick: (event) => {
            this.handleItemClick(event, child);
            if (child.props.onClick) {
              child.props.onClick(event);
            }
          },
          className: classNames({ selected: selected }),
          key: this.keyIndex++,
          nestedItems: Children.map(child.props.nestedItems, this.extendChild),
        });
      } else {
        return child;
      }
    }

    isChildSelected(child, props) {
      return props.value === child.props.value;
    }

    handleItemClick = (event, item) => {
      const itemValue = item.props.value;
      let hasNestedListItems = false;
      if (item.props.nestedItems && item.props.nestedItems.length) {
        hasNestedListItems = true;
      }
      if (itemValue !== this.props.value && !hasNestedListItems) {
        this.props.onChange(event, itemValue);          
      }
    };

    render() {
      const {
        children,
        ...other,
      } = this.props;
      this.keyIndex = 0;

      return (
        <MyComponent {...other} {...this.state}>
          {Children.map(children, this.extendChild)}
        </MyComponent>
      );
    }
  };
};

export default makeSelectable;
