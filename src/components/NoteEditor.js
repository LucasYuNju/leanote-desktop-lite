import React, { Component, PropTypes } from 'react';
import Quill from 'quill';

import 'quill/dist/quill.snow';

class NoteEditor extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleBlur = () => {
    if (this.changed) {
      this.props.onChange({
        ...this.props.note,
        Title: this.title.value,
        Content: this.quill.root.innerHTML,
      });      
    }
    this.changed = false;
  };
  
  handleChange = () => {
    this.changed = true;
  };
  
  reset = (note) => {
    this.quill.history.clear();
    this.quill.clipboard.dangerouslyPasteHTML(note.Content);
    this.title.value = note.Title;
    this.title.focus();
  }
  
  componentWillReceiveProps(nextProps) {
    const note = this.props.note;
    const nextNote = nextProps.note;
    if (note.NoteId !== nextNote.NoteId) {
      this.reset(nextNote);
    }
    this.changed = false;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="editor-container">
        <div className="ql-container" />
      </div>
    );
  }

  componentDidMount() {
    this.quill = new Quill('.ql-container', {
      theme: 'snow',
      placeholder: 'Enter text here...',
      modules: {
        toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'color': [] }, { 'background': [] }],
        ['bold', 'italic', 'underline', 'align'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],          
        ['code-block', 'link', 'image'],
       ]
     },
    });

    this.title = document.createElement('input');
    this.title.className = 'note-title';
    this.title.placeholder = "Title your note";
    this.title.oninput = this.handleChange;
    this.title.onblur = this.handleBlur;
    const parent = document.getElementsByClassName('editor-container')[0];
    parent.insertBefore(this.title, document.getElementsByClassName('ql-container')[0]);

    this.reset(this.props.note);

    this.quill.on('text-change', (range, oldRange, source) => {
      this.handleChange();
    });
    // quill's selection-change event can do the same thing. But it has a bug.
    document.getElementsByClassName('ql-editor')[0].onblur = () => {
      this.handleBlur();
    }
  }
}

export default NoteEditor;
