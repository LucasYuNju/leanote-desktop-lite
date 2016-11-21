import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import debounce from 'lodash/debounce';
import Icon from '../components/Icon';
import ToolBarContainer from '../containers/ToolBarContainer';

class TagBar extends Component {
  static propTypes = {
		linkTag: PropTypes.func.isRequired,
		note: PropTypes.object.isRequired,
		notebookTitle: PropTypes.string,
		tags: PropTypes.arrayOf(PropTypes.string).isRequired,
		unlinkTag: PropTypes.func.isRequired,
  };

	constructor(props) {
		super(props);
		this.state = {
			input: '',
			suggestions: [],
		};
		this.updateSuggestions = debounce(this.updateSuggestions, 200);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.note.noteId !== this.props.note.noteId) {
			this.setState({
				input: '',
				suggestions: [],
			});
		}
	}

  render() {
    const {
			input,
			note,
			notebookTitle,
      title,
      toggleEditMode,
    } = this.props;
    return (
      <div className="tag-bar">
				<div className="notebook">
					<Icon iconName="repo" />
					<span className="title">{notebookTitle}</span>
				</div>
				<div className="tags">
					<Icon iconName="tag" />
					{note.tags ? note.tags.map(tag => this.renderTag(tag)) : null}
					<input placeholder="Click to add tag" value={input} onInput={this.handleInput} />
					{this.renderSuggestions()}
				</div>
      </div>
    );
  }

	renderTag(tag) {
		return (
			<span className="tag" key={tag}>
				{tag}
			</span>
		);
	}

	renderSuggestions = () => {
		const suggestions = [...this.state.suggestions, this.state.input];
		return (
			<ul className={classNames('tag-suggestions', { hidden: suggestions.length === 0 })}>
				{suggestions.map(this.renderSuggestion)}
			</ul>
		);
	}

	renderSuggestion = (suggestion) => {
		return (
			<li
				key={suggestion}
			>
			{suggestion}
			</li>
		)
	}

	handleInput = (e) => {
		this.setState({
			input: e.currentTarget.value,
		});
		this.updateSuggestions();
	}

	updateSuggestions() {
		const tags = this.props.tags;
		const keyword = this.state.input.toLowerCase();
		if (keyword === '') {
			this.setState({
				suggestions: [],
			});
		}
		else {
			const suggestions = tags
				.filter(tag => {
					return tag.toLowerCase().startsWith(keyword);
				})
				.sort()
				.slice(0, 6);
			console.log(suggestions);
			this.setState({
				suggestions,
			});
		}
	}
}

export default TagBar;
