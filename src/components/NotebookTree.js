import 'react-treeview/react-treeview.css';
import React, { Component } from 'react';
import TreeView from 'react-treeview';

const dataSource = [
  {
    Title: 'foo',
    Sub: [
      {
        Title: 'foo-alpha',
      },
    ],
  },
  {
    Title: 'bar',
    Sub: [],
  },
];

class NotebookTree extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      notebooks: dataSource,
      collapsed: dataSource.map(() => true),
    };
  }
  
  handleClick(i) {
    const [...collapsed] = this.state.collapsed;
    collapsed[i] = !collapsed[i];
    this.setState({ collapsed });
  }

  render() {
    const collapsed = this.state.collapsed;
    const notebooks = this.state.notebooks;
    return (
      <div>
        {notebooks.map((parent, i) => {
          const label = <span className="node">{parent.Title}</span>;
          return (
            <TreeView
              key={i}
              nodeLabel={label}
              collapsed={collapsed[i]}
              onClick={this.handleClick.bind(this, i)}
            >
              {parent.Sub.map((child, j) => <div className="info" key={j}>{child.Title}</div>)}
            </TreeView>
          );
        })}
      </div>
    );
  }
}

export default NotebookTree;
