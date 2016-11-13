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
      if (child && child.type && child.type.selectable) {
        const selected = this.isChildSelected(child, this.props);

				console.log(child.props.id);
        return React.cloneElement(child, {
          onClick: (event) => {
            this.handleItemClick(event, child);
            if (child.props.onClick) {
              child.props.onClick(event);
            }
          },
          className: classNames({ selected: selected }),
          key: child.props.id,
          nestedItems: Children.map(child.props.nestedItems, this.extendChild),
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
