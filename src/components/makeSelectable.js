import React, {Component, Children, PropTypes} from 'react';
import classNames from 'classnames';

export const makeSelectable = (MyComponent) => {
  return class extends Component {
		// key property is not readable, use id instead.
    static propTypes = {
      children: PropTypes.node,
      onChange: PropTypes.func,
      id: PropTypes.any,
    };

    extendChild = (child) => {
      if (child && child.type.propTypes.selected) {
        return React.cloneElement(child, {
          onClick: (event) => {
            this.handleItemClick(event, child);
            if (child.props.onClick) {
              child.props.onClick(event);
            }
          },
          key: child.props.id,
          nestedItems: Children.map(child.props.nestedItems, this.extendChild),
					selected: this.isChildSelected(child, this.props),
        });
      } else {
        return child;
      }
    }

    isChildSelected(child, props) {
      return props.id === child.props.id;
    }

    handleItemClick = (event, item) => {
      const {
        nestedItems,
        id,
      } = item.props;
      const hasNestedListItems = nestedItems && nestedItems.length > 0;
      if (id !== this.props.id && !hasNestedListItems) {
        this.props.onChange(item);
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
