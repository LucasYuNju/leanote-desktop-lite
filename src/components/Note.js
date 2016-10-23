import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import NoteEditor from '../components/NoteEditor';
import NotePreview from '../components/NotePreview';

class Note extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = (note) => {
    this.props.onChange(note);
  };

  render () {
    const {
      Content,
      IsMarkdown,
    } = this.props.note;
    return (
      <div
      className={classNames('note', { edit: !IsMarkdown }, { preview: IsMarkdown })}
      >
        <NoteEditor
          note={this.props.note} 
          onChange={this.handleChange} 
        />
        <NotePreview value={Content} />
      </div>
    );
  }
}

export default Note;
