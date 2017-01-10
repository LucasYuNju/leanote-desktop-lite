import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';
import ToolBarContainer from '../containers/ToolBarContainer';

const MAX_NUM_SUGGESTIONS = 8;

class TagBar extends Component {
  static propTypes = {
		notebookTitle: PropTypes.string,
    noteTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string,
    onTitleChange: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props);
    console.log(context);
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
    const tags = noteTags.filter(tag => tag !== '');
    return (
      <div className="tag-bar">
				<div className="notebook">
					<Icon iconName="repo" />
					<span className="title">{notebookTitle}</span>
				</div>
				<div className="tags">
					{tags.length ? <Icon iconName="tag" /> : null}
					{tags.map(tag => this.renderTag(tag))}
				</div>
        <input
          className="note-title"
          value={this.state.title}
          placeholder="Untitled"
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
        />
      </div>
    );
  }

	renderTag = (tag) => {
		return (
			<span className="tag" key={tag}>
				{tag}
			</span>
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
}

export default TagBar;
