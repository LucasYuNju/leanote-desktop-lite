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
    this.changed = false;
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
      <div className="editor">
        <div id="toolbar-container">
          <div id="toolbar">
            <select className="ql-size" defaultValue="default">
              <option value="small"></option>
              <option></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select>
            <button className="ql-bold"></button>
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
          </div>
        </div>
        <input 
          ref={(title) => {this.title = title;}}
          id="note-title"
          placeholder="Title your note"
          onInput={this.handleChange}
          onBlur={this.handleBlur}
        />
        <div id="editor-container" />
      </div>
    );
  }

  componentDidMount() {
    this.quill = new Quill('#editor-container', {
      theme: 'snow',
      placeholder: 'Enter text here...',
      modules: {
        toolbar: '#toolbar',
     },
    });
    this.quill.on('text-change', (range, oldRange, source) => {
      this.handleChange();
    });
    // quill's selection-change event can do the same thing. But it has a bug.
    document.getElementsByClassName('ql-editor')[0].onblur = () => {
      this.handleBlur();
    }

    this.reset(this.props.note);
  }
}

export default NoteEditor;
