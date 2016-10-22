import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import NoteEditor from '../components/NoteEditor';
import NotePreview from '../components/NotePreview';

class Note extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    modified: false,
  };

  // constructor needed?
  handleChange = (title) => {
    this.setState({
      modified: true,
    });
  };

  handleBlur = (note) => {
    console.error('note blur');
    if (this.state.modified) {
      this.setState({
        modified: false,
      });
      this.props.onChange(note);
    }
  };

  render () {
    const {
      Content,
      IsMarkdown,
    } = this.props.note;
    return (
      <div
      className={classNames('note', { editing: !IsMarkdown }, { previewing: IsMarkdown })}
      >
        <NoteEditor
          note={this.props.note}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        <NotePreview value={Content} />
      </div>
    );
  }
}

export default Note;
