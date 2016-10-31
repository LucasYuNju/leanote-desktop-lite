import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';

import Icon from '../components/Icon';
import NoteToolbar from '../components/NoteToolbar';
import NoteEditor from '../components/NoteEditor';
import MarkdownEditor from '../components/MarkdownEditor';

class Note extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    editMode: false,
  };
  
  render() {
    const {
      note,
    } = this.props;
    return (
      <div className='note'>
        <NoteToolbar
          editMode={this.state.editMode}
          toggleEditMode={note.IsMarkdown ? this.toggleEditMode : null}
        />
        <NoteEditor
          active={!note.IsMarkdown}
          note={note}
          onContentChange={this.handleContentChange}
          onTitleChanging={this.handleTitleChanging}
          onTitleChange={this.handleTitlChange}
        />
        <MarkdownEditor
          active={note.IsMarkdown}
          editMode={this.state.editMode}
          note={note}
        />
      </div>
    );
  }

  handleTitlChange = (title) => {
    this.props.onChange({
      ...this.props.note,
      Title: title,
    });
  };

  handleContentChange = (content) => {
    const note = {
      ...this.props.note,
      Content: content,
    };
    this.props.onChange(note);
  };

  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };
}

export default Note;
