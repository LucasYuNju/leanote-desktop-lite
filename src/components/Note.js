import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';

import { getThumbnail, getAbstract } from '../util/regex';
import Icon from '../components/Icon';
import SlateEditor from '../components/SlateEditor';
import TagBar from '../components/TagBar';
import NoteEditor from '../components/NoteEditor';
import CSSTransitionGroup from 'react-addons-css-transition-group';

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

  render = () => {
    const {
			editMode,
			addNoteTag,
      note,
			notebook,
			allTags,
			removeNoteTag,
    } = this.props;
    return (
      <CSSTransitionGroup
        transitionName="fade"
        transitionLeave={false}
        transitionEnterTimeout={100}
        className="fade-wrapper"
      >
        <div
          className="note"
          key={note.noteId}
        >
          <TagBar
            notebookTitle={notebook.title}
            noteTags={note.tags}
            title={note.title}
            onTitleChange={this.handleTitleChange}
          />
          <SlateEditor
            active={note.isMarkdown}
            editMode={editMode}
            note={note}
          />
        </div>
      </CSSTransitionGroup>
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
