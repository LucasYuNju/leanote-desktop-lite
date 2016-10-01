import React, { Component } from 'react';

import NotebookList from '../components/NotebookList';

class NavContainer extends Component {
  state = {
    selected: '',
    expanded: '',
  };

  handleItemSelect = (event, value) => {
    this.setState({
      selected: value,
      expanded: value,
    });
  };
  
  handleContentSelect = (event, value) => {
    this.setState({
      selected: '',
    });
  };

  render() {
    return (
      <nav>
        <NavItem
          value="notebook"
          icon="fa-file-text-o"
          onChange={this.handleItemSelect}
          expanded={this.state.expanded === 'notebook'}
          selected={this.state.selected === 'notebook'}
          text="Notebook"
        >
          <NotebookList onChange={this.handleContentSelect}/>
        </NavItem>
        <NavItem
          value="tag"
          icon="fa-tag"
          onChange={this.handleItemSelect}
          expanded={this.state.expanded === 'tag'}
          selected={this.state.selected === 'tag'}
          text="Tag"
        >
          <span>Tag</span>
        </NavItem>        
      </nav>
    );
  }
}

const NavItem = (props) => {
  const handleClick = (event) => {
    props.onChange(event, props.value);
  };
  return (
    <div className={props.selected ? "nav-item selected" : "nav-item"}>
      <div className="header" onClick={handleClick}>
        <span className="icon">
          <i className={"fa " + props.icon} aria-hidden="true"></i>
        </span>
        <span>{props.text}</span>
      </div>
      {!props.expanded ? null : (
        <div className="content">
          {props.children}
        </div>
      )}
    </div>
  );
};

export default NavContainer;
