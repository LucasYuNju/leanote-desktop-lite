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
    const quill = new Quill('.editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
    });
    this.setState({
      editor: quill,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content) {
      console.log(nextProps.content);
      this.state.editor.clipboard.dangerouslyPasteHTML(nextProps.content);
    }
  }

  render() {
    return (
      <div className="editor" />
      
    );
  }
}

export default App;
