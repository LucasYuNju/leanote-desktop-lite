import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import debounce from 'lodash/debounce';
import Icon from '../components/Icon';
import ToolBarContainer from '../containers/ToolBarContainer';

const MAX_NUM_SUGGESTIONS = 8;

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
			selectedSuggestion: 0,
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
    const { note, notebookTitle, title, toggleEditMode } = this.props;
		const { input } = this.state;
    return (
      <div className="tag-bar">
				<div className="notebook">
					<Icon iconName="repo" />
					<span className="title">{notebookTitle}</span>
				</div>
				<div className="tags">
					<Icon iconName="tag" />
					{note.tags ? note.tags.map(tag => this.renderTag(tag)) : null}
					<input
						onBlur={this.addTag}
						onInput={this.onInputChange}
						onKeyDown={this.onInputKeydown}
						placeholder="Click to add tag"
						value={input}
					/>
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
		return (
			<ul
				className={classNames('suggestions', 'dropdown', { hidden: this.state.suggestions.length <= 1 })}
			>
				{this.state.suggestions.map(this.renderSuggestion)}
			</ul>
		);
	}

	renderSuggestion = (suggestion, i) => {
		return (
			<li
				className={classNames({ selected: i === this.state.selectedSuggestion }, { hidden: i === 0 })}
				key={suggestion}
				onMouseDown={this.onSuggestionMouseDown}
			>
			{suggestion}
			</li>
		);
	}

	onInputChange = (e) => {
		this.setState({
			input: e.currentTarget.value,
		});
		this.updateSuggestions(e.currentTarget.value);
	}

	onSuggestionMouseDown = (e) => {
		e.preventDefault();
		this.addTag(e.currentTarget.text);
	}

	addTag = (tag = this.state.input) => {
		if (tag !== '') {
			this.props.linkTag(this.props.note.noteId, tag);
		}
		this.setState({
			input: '',
			suggestions: [],
			selectedSuggestion: 0,
		});
	}

	onInputKeydown = (e) => {
		const {
			suggestions,
			selectedSuggestion,
		} = this.state;
		let nextSelection;
		switch(e.keyCode) {
			case 8:
				// backspace
				break;
			case 13:
				// enter
				this.addTag();
				break;
			case 38:
				// up arrow
				nextSelection = (this.state.selectedSuggestion - 1 + suggestions.length) % suggestions.length;
				this.setState({
					input: suggestions[nextSelection],
					selectedSuggestion: nextSelection,
				});
				e.preventDefault();
				break;
			case 40:
				// down arrow
				nextSelection = (this.state.selectedSuggestion + 1) % suggestions.length;
				this.setState({
					input: suggestions[nextSelection],
					selectedSuggestion: nextSelection,
				})
				e.preventDefault();
				break;
			default:
		}
	}

	updateSuggestions(keyword) {
		const { tags } = this.props;
		keyword = keyword.toLowerCase();
		let suggestions = [];

		if (keyword !== '') {
			suggestions = tags
				.filter(tag => {
					return tag.toLowerCase().startsWith(keyword);
				})
				.sort()
				.slice(0, MAX_NUM_SUGGESTIONS);
			suggestions.unshift(keyword);
		}
		this.setState({
			suggestions,
			selectedSuggestion: 0,
		});
	}
}

export default TagBar;
