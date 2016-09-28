import React, { Component } from 'react';

class NavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebooks: []
    }
  }

  componentWillMount() {
    service.notebook.getNotebooks(res => {
      this.setState({ notebooks: res });
    });
  }

  render() {
    return (
      <nav>
        <ul className="nav-items">
          <li className="nav-item">Starred</li>
          <li className="nav-item">Tag</li>
          <li className="nav-item">Notebook</li>
        </ul>
      </nav>
    );
  }
}

export default NavContainer;
