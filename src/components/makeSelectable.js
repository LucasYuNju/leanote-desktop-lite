import React, {Component, Children, PropTypes} from 'react';

export const makeSelectable = (MyComponent) => {
  return class extends Component {
    static propTypes = {
      children: PropTypes.node,
      onChange: PropTypes.func,
      value: PropTypes.any,
    };

    extendChild = (child) => {
      if (child && child.type && child.type.displayName === 'ListItem') {
        const selected = this.isChildSelected(child, this.props);
        const classes = selected ? 'selected' : '';

        return React.cloneElement(child, {
          onClick: (event) => {
            this.handleItemClick(event, child);
            if (child.props.onClick) {
              child.props.onClick(event);
            }
          },
          className: classes,
          key: this.keyIndex++,
          nestedItems: child.props.nestedItems.map(this.extendChild),
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

      if (itemValue !== this.props.value) {
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
