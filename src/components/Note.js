import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';

import Icon from '../components/Icon';
import MarkdownEditor from '../components/MarkdownEditor';
import NoteToolbar from '../components/NoteToolbar';
import NoteEditor from '../components/NoteEditor';

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
          toggleEditMode={note.isMarkdown ? this.toggleEditMode : null}
        />
        <NoteEditor
          active={!note.isMarkdown}
          note={note}
          onContentChange={this.handleContentChange}
          onTitleChanging={this.handleTitleChanging}
          onTitleChange={this.handleTitlChange}
        />
        <MarkdownEditor
          active={note.isMarkdown}
          editMode={this.state.editMode}
          note={note}
        />
      </div>
    );
  }

  handleTitlChange = (title) => {
    this.props.onChange({
      ...this.props.note,
      title,
    });
  };

  handleContentChange = (content) => {
    const note = {
      ...this.props.note,
      content,
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
