import 'react-treeview/react-treeview.css';
import React, { Component } from 'react';
import TreeView from 'react-treeview';
import { List, ListItem } from 'material-ui/List';

class NotebookTree extends Component {
  state = {
    notebooks: [],
    collapsed: [],
  }

  componentWillMount() {
    service.notebook.getNotebooks(res => {
      this.setState({ notebooks: res });
    });
  }

  render() {
    return (
      <List>
        <ListItem primaryText="Sent mail" />
        <ListItem primaryText="Drafts" />
        <ListItem
          primaryText="Inbox"
          initiallyOpen={true}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Starred"
            />,
            <ListItem
              key={2}
              primaryText="Sent Mail"
            />,
          ]}
        />
      </List>
    );
  }
}

export default NotebookTree;
