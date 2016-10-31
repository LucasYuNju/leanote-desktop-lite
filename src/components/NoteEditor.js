import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import Quill from 'quill';

import 'quill/dist/quill.snow';

class NoteEditor extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    note: PropTypes.object.isRequired,
    // called if editor blur and note content has been edited
    onContentChange: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    title: PropTypes.string,
  };

  handleEditorBlur = () => {
    if (this.changed) {
      this.props.onContentChange(this.quill.root.innerHTML);
    }
    this.changed = false;
  };
  
  handleContentChange = () => {
    this.changed = true;
  };
  
  reset = (note) => {
    this.title.value = note.Title;
    this.quill.history.clear();
    this.quill.clipboard.dangerouslyPasteHTML(note.Content);
    this.changed = false;
  }
  
  componentWillReceiveProps(nextProps) {
    this.container.className = classNames('note-editor', { hidden: !nextProps.active });
    if (!nextProps.active) {
      return;
    }
    const note = this.props.note;
    const nextNote = nextProps.note;
    if (note.NoteId !== nextNote.NoteId) {
      this.reset(nextNote);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    // TODO no need to define toolbar manually
    return (
      <div
        ref={(ref) => this.container = ref}
        className={classNames('note-editor', { hidden: !this.props.active })}
      >
        <div id="editor-container" />
      </div>
    );
  }

  componentDidMount() {
    const Image = Quill.import('formats/image');
    Image.sanitize = (url) => url;
    this.quill = new Quill('#editor-container', {
      theme: 'snow',
      placeholder: 'Enter text here...',
      modules: {
        toolbar: [
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          ['bold', 'italic', 'underline', { 'color': [] }, 'blockquote', 'code-block'],        // toggled buttons
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['clean']
        ],
      },
    });
    
    const editorContainer = document.getElementById('editor-container');
    this.container.insertBefore(document.createElement('hr'), editorContainer);
    
    this.title = document.createElement('input');
    this.title.className = 'note-title';
    this.title.placeholder = "Title your note";
    this.title.onblur = () => {
      this.props.onTitleChange(this.title.value);
    };
    this.container.insertBefore(this.title, editorContainer);
    
    this.quill.on('text-change', (range, oldRange, source) => {
      this.handleContentChange();
    });
    // quill selection-change event can do the same thing. But it has a bug.
    document.getElementsByClassName('ql-editor')[0].onblur = () => {
      this.handleEditorBlur();
    }
    
    if (this.props.active) {
      this.reset(this.props.note);      
    }
  }
}

export default NoteEditor;
