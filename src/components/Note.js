import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';

import Icon from '../components/Icon';
import NoteTitle from '../components/NoteTitle';
import NoteEditor from '../components/NoteEditor';
import MarkdownEditor from '../components/MarkdownEditor';

class Note extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  
  state = {
    editMode: false,
    note: {
      ...this.props.note,
    },
  };
    
  componentWillReceiveProps(nextProps) {
    const note = this.state.note;
    const nextNote = nextProps.note;
    if (note.NoteId !== nextProps.note.NoteId) {
      if (this.changed) {
        console.error("error in Note, update note before switching");
      }
      this.setState({
        note: {
          ...nextNote,
        },
      });
    }
  }
  
  render() {
    const {
      note,
    } = this.state;
    return (
      <div className='note'>
        <NoteTitle
          editMode={this.state.editMode}
          onChanging={this.handleTitleChanging}
          onChange={this.handleTitlChange}
          title={note.Title}
          toggleEditMode={note.IsMarkdown ? this.toggleEditMode : null}
        />
        <NoteEditor
          active={!note.IsMarkdown}
          note={note}
          onChange={this.handleContentChange}
        />
        <MarkdownEditor
          active={note.IsMarkdown}
          editMode={this.state.editMode}
          note={note}
        />
      </div>
    );
  }

  handleTitleChanging = (title) => {
    this.setState({
      note: {
        ...this.state.note,
        Title: title,
      }
    });
  };

  handleTitlChange = () => {
    const note = this.state.note;
    this.props.onChange(note);
  };

  handleContentChange = (content) => {
    const note = {
      ...this.state.note,
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
