import React, { Component } from 'react';

import NotebookList from '../components/NotebookList';

const NavItem = (props) => {
  let classes = 'nav-item';
  if (props.selected) {
    classes += ' .selected';
  }
  return (
    <li className={classes}>
      <div className="title" onClick={props.onClick}>
        <span className="icon"></span>
        <span className="name">{props.name}</span>
      </div>
      {props.selected ? props.children : null}
    </li>
  );
};

class NavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  handleClick(label) {
    const selected = this.state.selected === label ? '' : label;
    this.setState({ selected });
  }

  render() {
    return (
      <nav>
        <NotebookList />
      </nav>
    );
  }
}

export default NavContainer;
