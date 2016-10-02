import React, {
  Component,
  PropTypes,
} from 'react';
import TreeView from 'react-treeview';
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
      this.setState({ notebooks: res });
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

  render() {
    return (
      <SelectableList 
        onChange={this.handleSelectionChange}
        value={this.state.selected}
      >
        <ListItem
          primaryText="Sent mail"
          value="SentMail"
        />
        <ListItem
          primaryText="Drafts"
          value="Drafts"
        />
        <ListItem
          primaryText="Inbox"
          value="Inbox"
          initiallyOpen={true}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Starred"
              value="Starred"
            />,
            <ListItem
              key={2}
              primaryText="Notebook"
              value="Notebook"
            />,
          ]}
        />
      </SelectableList>
    );
  }
}

export default NotebookTree;
