import React, { Component, PropTypes } from 'react';

// Nav item has a header and it's content can hide.
class NavItem extends Component {
  static propTypes = {
    icon: PropTypes.string,
    onChange: PropTypes.func,
    selected: PropTypes.bool,
    text: PropTypes.string,
    value: PropTypes.string,
  };

  state = {
    showContent: false,
    contentClicked: false,
  };

  handleHeaderClick = (event) => {
    this.props.onChange(event, this.props.value);
    this.setState({
      showContent: !this.state.showContent,
      contentClicked: false,
    });
  };

  handleContentClick = (event) => {
    this.setState({
      contentClicked: true,
    });
  }

  renderExpandedContent() {
    if (this.state.showContent) {
      return (
        <div className="content">
          {this.props.children}
        </div>
      );
    }
    return null;
  }

  render() {
    const highlight = this.props.selected && !this.state.contentClicked;
    return (
      <div className={highlight ? "nav-item selected" : "nav-item"}>
        <div className="header" onClick={this.handleHeaderClick}>
          <span className="icon">
            <i className={"fa " + this.props.icon} aria-hidden="true"></i>
          </span>
          <span>{this.props.text}</span>
        </div>
        <div className="content" onClick={this.handleContentClick}>
          {this.renderExpandedContent()}
        </div>
      </div>
    );
  }
}

export default NavItem;
