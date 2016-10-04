import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';
import SelectableList from './SelectableList';

class NotebookList extends Component {
  static propTypes = {
    clearSelection: PropTypes.bool,
    notebooks: PropTypes.object,
    onChange: PropTypes.func,
    rootId: PropTypes.string,
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

  handleListSelect = (event, value) => {
    this.setState({
      selected: value,
    });
    this.props.onChange(event, value.NotebookId);
  };

  createListItem = (notebook) => {
    return (
      <ListItem
        primaryText={notebook.Title}
        value={notebook}
        key={notebook.NotebookId}
        nestedItems={notebook.childIds.map(childId => this.createListItem(this.props.notebooks[childId]))}
      />
    );
  }

  render() {
    const {
      notebooks,
      rootId,
    } = this.props;
    return (
      <SelectableList 
        onChange={this.handleListSelect}
        value={this.state.selected}
      >
        {notebooks[rootId].childIds.map(childId => this.createListItem(notebooks[childId]))}
      </SelectableList>
    );
  }
}

export default NotebookList;
