import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import Quill from 'quill';

import 'quill/dist/quill.snow';

class NoteEditor extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    note: PropTypes.object.isRequired,
    // called if editor blur and note content has been edited
    onChange: PropTypes.func.isRequired,
  };

  handleBlur = () => {
    if (this.changed) {
      this.props.onChange(this.quill.root.innerHTML);
    }
    this.changed = false;
  };
  
  handleChange = () => {
    this.changed = true;
  };
  
  reset = (note) => {
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
      this.changed = false;
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
    
    this.quill.on('text-change', (range, oldRange, source) => {
      this.handleChange();
    });
    // quill's selection-change event can do the same thing. But it has a bug.
    document.getElementsByClassName('ql-editor')[0].onblur = () => {
      this.handleBlur();
    }
    
    if (this.props.active) {
      this.reset(this.props.note);      
    }
  }
}

export default NoteEditor;
