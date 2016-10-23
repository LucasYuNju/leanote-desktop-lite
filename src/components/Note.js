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

  handleChange = (title) => {
    this.setState({
      modified: true,
    });
  };

  handleBlur = (note) => {
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
      className={classNames('note', { edit: !IsMarkdown }, { preview: IsMarkdown })}
      >
        <NoteEditor content={Content} />
        <NotePreview value={Content} />
      </div>
    );
  }
}

export default Note;
