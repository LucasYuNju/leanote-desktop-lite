import React, { Children, cloneElement, Component, PropTypes } from 'react';

import List from '../components/List';

class NestedList extends Component {
  static propTypes = {
    children: PropTypes.node,
    nestedLevel: PropTypes.number,
    open: PropTypes.bool,
  };

  static defaultProps = {
    open: true,
  }

  render() {
    const {
      children,
      nestedLevel,
      open,
      ...others
    } = this.props;

    if (!open) {
      return null;
    }

    return (
      <List {...others}>
        {Children.map(children, (child) => {
          return cloneElement(child, {
            nestedLevel: nestedLevel + 1,
          })
        })}
      </List>
    );
  }
}

export default NestedList;
