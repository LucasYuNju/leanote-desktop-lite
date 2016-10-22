import marked from 'marked';

import React, { Component, PropTypes } from 'react';

class NotePreview extends Component {
  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: 'I am using __markdown__.',
  };

  render() {
    const htmlContent = marked(this.props.value);
    return (
      <div
        className="note-preview"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }
}

export default NotePreview;
