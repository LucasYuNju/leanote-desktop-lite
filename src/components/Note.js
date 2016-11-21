import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';

import Icon from '../components/Icon';
import MarkdownEditor from '../components/MarkdownEditor';
import TagBar from '../components/TagBar';
import NoteEditor from '../components/NoteEditor';

class Note extends Component {
  static propTypes = {
		editMode: PropTypes.bool,
    note: PropTypes.object.isRequired,
		notebook: PropTypes.object.isRequired,
    updateNote: PropTypes.func.isRequired,
  };

  render() {
    const {
			editMode,
      note,
			notebook,
    } = this.props;
    return (
      <div className='note'>
        <TagBar
					note={note}
					notebookTitle={notebook.title}
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
          editMode={editMode}
          note={note}
        />
      </div>
    );
  }

  handleTitlChange = (title) => {
    this.props.updateNote({
      ...this.props.note,
      title,
    });
  };

  handleContentChange = (content) => {
    const note = {
      ...this.props.note,
      content,
    };
    this.props.updateNote(note);
  };
}

export default Note;
