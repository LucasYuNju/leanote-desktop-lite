import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';
import SelectableList from './SelectableList';

class NotebookTree extends Component {
  static propTypes = {
    clearSelection: PropTypes.bool,
    notebooks: PropTypes.array,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    clearSelection: false,
    notebooks: [],
    onChange: () => {},
  };

  state = {
    selected: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.clearSelection) {
      this.setState({
        selected: null,
      });
    }
  }

  handleSelectionChange = (event, value) => {
    this.setState({
      selected: value,
    });
    this.props.onChange(event, null);
  };

  createListItem = (notebook, index) => {
    return (
      <ListItem
        primaryText={notebook.Title}
        value={notebook}
        key={index}
        nestedItems={notebook.Subs.map(this.createListItem)}
      />
    );
  }

  render() {
    return (
      <SelectableList 
        onChange={this.handleSelectionChange}
        value={this.state.selected}
      >
        {this.props.notebooks.map(this.createListItem)}
      </SelectableList>
    );
  }
}

export default NotebookTree;
