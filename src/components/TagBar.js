import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';
import ToolBarContainer from '../containers/ToolBarContainer';

class TagBar extends Component {
  static propTypes = {
		notebookTitle: PropTypes.string,
    noteTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string,
    onTitleChange: PropTypes.func.isRequired,
  };

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

    const tags = noteTags.filter(tag => tag !== '');
    return (
      <div className="tag-bar">
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
				<div className="btn notebook">
					<span className="text">{notebookTitle}</span>
          <Icon iconName="plus" className="delete" />
				</div>
				{tags.map(tag => this.renderTag(tag))}
      </div>
    );
  }

	renderTag = (tag) => {
		return (
			<div className="btn tag" key={tag}>
        <span className="text">{tag}</span>
        <Icon iconName="plus" onClick={this.handleDeleteButtonClick}/>
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

  handleDeleteButtonClick = (e) => {

  }

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
