import React, { Component, PropTypes } from 'react';
import Quill from 'quill';

import 'quill/dist/quill.snow';

class NoteEditor extends Component {
  static propTypes = {
    content: PropTypes.string,
  };

  static defaultProps = {
    content: '',
  };

  state = {
    editor: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.content) {
      this.state.editor.clipboard.dangerouslyPasteHTML(nextProps.content);
    }
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
    const quill = new Quill('.ql-container', {
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
    this.setState({
      editor: quill,
    });

    const title = document.createElement('input');
    title.className = 'note-title';
    title.placeholder = "Title your note";
    const parent = document.getElementsByClassName('editor-container')[0];
    parent.insertBefore(title, document.getElementsByClassName('ql-container')[0]);    
  }
}

export default NoteEditor;
