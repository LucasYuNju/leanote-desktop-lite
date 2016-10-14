import React, {Component, PropTypes} from 'react';

import SNEditor from '../components/SNEditor';

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
        <SNEditor />
      </div>
    );
  }
}

export default Note;
