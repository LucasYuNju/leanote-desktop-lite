import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import SimpleMDE from 'simplemde';

import 'simplemde/dist/simplemde.min.css';

class MarkdownEditor extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.editMode = props.editMode;
  }

  componentWillReceiveProps(nextProps) {
    this.container.className = classNames('markdown-editor', { hidden: !nextProps.note.isMarkdown });
    if (!nextProps.note.isMarkdown) {
      return;
    }
    if (nextProps.note.noteId !== this.props.note.noteId) {
      this.simplemde.value(nextProps.note.content);
    }
    if (nextProps.editMode !== this.editMode) {
      this.togglePreview();
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      active,
      note,
    } = this.props;

    return (
      <div className="markdown-editor"
        ref={(ref) => this.container = ref}
        className={classNames('markdown-editor', { hidden: !note.isMarkdown })}
      >
        <textarea id="simplemde-container"
          ref={(ref) => this.textarea = ref}
        />
      </div>
    );
  }

  componentDidMount() {
    this.simplemde = new SimpleMDE({
      autofocus: true,
      element: this.textarea,
      toolbar: ['bold', 'italic', 'heading', '|', 'quote', 'unordered-list', 'ordered-list', 'table', '|', 'link', 'image'],
      status: false,
      spellChecker: false,
    });
    if (this.props.note.isMarkdown) {
      this.simplemde.value(this.props.note.content);
    }
  }

  togglePreview = () => {
    this.simplemde.togglePreview();
    this.editMode = !this.editMode;
  }
}

export default MarkdownEditor;
