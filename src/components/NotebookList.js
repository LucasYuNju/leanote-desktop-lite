import React, {
  Component,
  PropTypes,
} from 'react';
import ListItem from './ListItem';
import SelectableList from './SelectableList';

class NotebookTree extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    clearSelection: PropTypes.bool,
  };

  static defaultProps = {
    onChange: () => {},
    clearSelection: false,
  };

  state = {
    notebooks: [],
    selected: null,
  };

  componentWillMount() {
    service.notebook.getNotebooks(res => {
      this.setState({
        notebooks: res
      });
    });
  }
  
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
        {this.state.notebooks.map(this.createListItem)}
      </SelectableList>
    );
  }
}

export default NotebookTree;
