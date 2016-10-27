import classNames from 'classnames';
import marked from 'marked';
import React, { Component, PropTypes } from 'react';

class MarkdownEditor extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
  };
  
  componentWillReceiveProps(nextProps) {
    this.container.className = classNames('markdown-editor', nextProps.className);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      note,
    } = this.props;
    const htmlContent = marked(note.Content);
    return (
      <div className="markdown-editor" ref={(ref) => this.container = ref}>
        <div
          className="markdown-preview"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    );
  }
}

export default MarkdownEditor;
