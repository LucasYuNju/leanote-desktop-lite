import React, {
  Children,
  cloneElement,
  Component,
  PropTypes
} from 'react';

class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    nestedLevel: PropTypes.number,
    open: PropTypes.bool,
  };
  
  static defaultProps = {
    nestedLevel: 0,
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
      <div {...others} className="lea-list">
        {Children.map(children, (child) => {
          return cloneElement(child, {
            nestedLevel: nestedLevel + 1,
          })
        })}
      </div>
    );
  }
}

export default List;
