import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';

import { getThumbnail, getAbstract } from '../util/regex';
import Icon from '../components/Icon';
import SlateEditor from '../components/SlateEditor';
import TagBar from '../components/TagBar';
import NoteEditor from '../components/NoteEditor';

class Note extends Component {
  static propTypes = {
		editMode: PropTypes.bool,
    note: PropTypes.object.isRequired,
		notebook: PropTypes.object.isRequired,
		allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateNote: PropTypes.func.isRequired,
		addNoteTag: PropTypes.func.isRequired,
		removeNoteTag: PropTypes.func.isRequired,
  };

  render() {
    const {
			editMode,
			addNoteTag,
      note,
			notebook,
			allTags,
			removeNoteTag,
    } = this.props;
    return (
      <div className='note'>
        <TagBar
					addNoteTag={addNoteTag}
					notebookTitle={notebook.title}
					noteId={note.noteId}
					noteTags={note.tags}
					allTags={allTags}
					removeNoteTag={removeNoteTag}
        />
        <NoteEditor
          active={!note.isMarkdown}
          note={note}
          onContentChange={this.handleContentChange}
          onTitleChange={this.handleTitleChange}
        />
        <SlateEditor
          active={note.isMarkdown}
          editMode={editMode}
          note={note}
        />
      </div>
    );
  }

  handleTitleChange = (title) => {
    this.props.updateNote({
      ...this.props.note,
      title,
    });
  };

  handleContentChange = (content) => {
    this.props.updateNote({
      abstract: getAbstract(content),
      content,
      noteId: this.props.note.noteId,
      thumbnail: getThumbnail(content),
      usn: this.props.note.usn,
    });
  };
}

export default Note;
