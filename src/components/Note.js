import React, {Component, PropTypes} from 'react';

import QuillEditor from '../components/QuillEditor';

class Note extends Component {
  static propTypes = {
    note: PropTypes.object,
    onChange: PropTypes.func,
  };

  state = {
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange();
    }
  };

  render () {
    const note = this.props.note;
    let content = note ? note.Content : '';
    return (
      <div className="note">
        <QuillEditor content={content}/>
      </div>
    );
  }
}

export default Note;
