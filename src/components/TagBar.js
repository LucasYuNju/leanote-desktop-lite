import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';
import ToolBarContainer from '../containers/ToolBarContainer';

class TagBar extends Component {
  static propTypes = {
    notebookTitle: PropTypes.string,
    noteId: PropTypes.string.isRequired,
    noteTags: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    onTitleChange: PropTypes.func.isRequired,
    removeNoteTag: PropTypes.func.isRequired,
  };

  static defaultProps = {
    noteTags: [],
  }

  constructor(props, context) {
    super(props);
    this.state = {
      title: props.title,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
    });
  }

  render() {
    const { noteTags, notebookTitle, toggleEditMode } = this.props;
    const titleWidth = Math.max(80, this.calculateInputWidth(this.state.title));

    return (
      <div className="tag-bar">
        <div className="note-info">
          <div className="notebook">
            <Icon iconName="repo" />
            <span className="title">{notebookTitle}</span>
          </div>
          {this.renderTags()}
        </div>
        <div className="note-title">
          <input
            value={this.state.title}
            placeholder="Untitled"
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            size={10}
            style={{ width: titleWidth}}
          />
        </div>
      </div>
    );
  }

	renderTags = (tag) => {
    const tags = this.props.noteTags ? this.props.noteTags.filter(tag => tag !== '') : [];
    if (tags.length === 0) {
      return null;
    }
    return (
      <div className="tags">
        <Icon iconName="tag" />
        {tags.map(tag => (
            <div className="label tag" key={tag}>
              <span className="text">{tag}</span>
              <Icon iconName="plus" onClick={this.handleDeleteButtonClick.bind(this, tag)} />
            </div>
        ))}
      </div>
    );
	}

  handleInputChange = (e) => {
    this.setState({
      title: e.currentTarget.value,
    });
  }

  handleInputBlur = (e) => {
    this.props.onTitleChange(this.state.title);
  }

  handleDeleteButtonClick = (tag) => {
    this.props.removeNoteTag(this.props.noteId, tag);
  }

  // deprecated
  calculateInputWidth = (text) => {
    const span = document.createElement('span');
    span.innerText = text;
    span.classList.add('input-width-calculator');
    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    return width;
  }
}

export default TagBar;
