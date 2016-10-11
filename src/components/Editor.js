import React, { Component, PropTypes } from 'react';
import { Editor, EditorState } from 'draft-js';

class MyEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onChange = (editorState) => {
    this.setState({ editorState });
  }

  focus = () => {
    this.refs.editor.focus();
  }

  render() {
    const { editorState } = this.state;
    return (
      <div
        className='editor'
        onClick={this.focus}
      >
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          ref="editor"
        />
      </div>
    );
  }
}

export default MyEditor;
