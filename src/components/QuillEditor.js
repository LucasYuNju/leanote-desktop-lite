import React, { Component, PropTypes } from 'react';
import Quill from 'quill';

class App extends Component {
  static propTypes = {
    content: PropTypes.string,
  };

  static defaultProps = {
    content: '',
  };

  state = {
    editor: null,
  };

  componentDidMount() {
    // console.error(tinymce);
    const editor = tinymce.init({
      selector: '.editor-container',
      menubar: false,
      theme: 'modern',
      statusbar: false,
    });
    // const quill = new Quill('.editor-container', {
    //   theme: 'snow',
    //   placeholder: 'Create a note...',
    //   modules: {
    //     toolbar: [
    //       [{ 'font': [] }],
    //       // [{ header: [1, 2, false] }],
    //       [{ 'color': [] }, { 'background': [] }],
    //       ['bold', 'italic', 'underline', 'align'],
    //       [{ 'list': 'ordered'}, { 'list': 'bullet' }],          
    //       ['code-block', 'link', 'image'],
    //     ]
    //   },
    // });
    this.setState({
      editor: editor,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content) {
      console.log(nextProps.content);
      // this.state.editor.clipboard.dangerouslyPasteHTML(nextProps.content);
    }
  }

  render() {
    return (
      <div className="editor-container" />
    );
  }
}

export default App;
