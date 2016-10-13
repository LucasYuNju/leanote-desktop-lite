import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';

class Note extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange();
    }
  };

  render () {
    return (
      <div className="note">
        <RichTextEditor
          className="rich-editor"
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Note;
