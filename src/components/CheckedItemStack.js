import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const MAX_HIDDEN_CARD = 4;

class CheckedItemStack extends Component {
  static propTypes = {
    checked: PropTypes.array.isRequired,
  };

  render() {
    const { checked } = this.props;
    return (
      <div className="checked-item-stack">
        <div className="cards">
          {this.renderCoverCard()}
          {checked.slice(1).map(this.renderHiddenCard)}
        </div>
      </div>
    );
  }
  renderCoverCard = () => {
    const { checked } = this.props;
    const style = {
      transform: 'translate(-2px, -1px)',
      zIndex: MAX_HIDDEN_CARD + 1,
    };
    return (
      <div className="card" style={style}>
        <p className="count">{checked.length}</p>
        <div className="desc">notes selected</div>
        <div className="actions">
          <div className="action btn">Delete</div>
          <div className="action btn">Move to notebook</div>
        </div>
      </div>
    )
  }

  renderHiddenCard = (item, i, a) => {
    if (i >= MAX_HIDDEN_CARD) {
      return null;
    }
    const style = {
      transform: `rotate(${((i + 1) / Math.min(MAX_HIDDEN_CARD, a.length)) * 5 + Math.random()}deg)`,
      zIndex: MAX_HIDDEN_CARD - i,
    }
    if (i + 1 === Math.min(MAX_HIDDEN_CARD, a.length)) {
      // 最下面一个card
      style.transform = style.transform + ` translate(2px, 2px)`;
      console.log(style.transform);
    }
    return (
      <div
        key={i}
        className="card blocked"
        style={style}
      />
    );
  }
}

export default CheckedItemStack;
