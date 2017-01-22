import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { Component, PropTypes } from 'react';

import Icon from '../components/Icon';

class TagPickerPopover extends Component {
  static propTypes = {
    hide: PropTypes.func.isRequired,
    addNoteTag: PropTypes.func.isRequired,
    noteId: PropTypes.string.isRequired,
    tagged: PropTypes.object.isRequired,
    togglePopover: PropTypes.func,
    removeNoteTag: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      filteredTags: Object.keys(this.props.tagged).sort().filter(tag => tag !== ''),
      input: '',
      selected: -1,
    };
    this.filterTags = debounce(this.filterTags, 50);
  }

  render() {
    const { tagged } = this.props;
    const { filteredTags, input } = this.state;
    return (
      <div className="tag-picker-popover">
        <div className="search-bar">
          <input
            ref={(input) => { this.input = input }}
            onBlur={this.onInputBlur}
            onInput={this.onInputChange}
            onKeyDown={this.onInputKeydown}
            placeholder="Click to add tag"
            value={input}
          />
          <Icon iconName="search" />
          </div>
        <ul className={classNames('tag-list', 'dropdown')}>
          {filteredTags.map((tag, i) => {
            return tagged[tag] === undefined ? this.renderNewTag(tag, i) : this.renderExistingTag(tag, i);
          })}
          </ul>
			</div>
		);
  }

  componentDidMount() {
    this.input.focus();
  }

	renderExistingTag = (tag, i) => {
		const { tagged } = this.props;
		const { selected } = this.state;
		return (
			<li
				className={classNames('tag-list-item', { selected: i === selected })}
				data-tag={tag}
				key={tag}
				onMouseDown={this.onSuggestionMouseDown}
			>
				<div className="checkbox">
					<input type="checkbox" id="checkbox" checked={tagged[tag]} readOnly />
					<label htmlFor="checkbox" />
				</div>
				<span className="text">{tag}</span>
			</li>
		);
	}

	renderNewTag = (tag, i) => {
		const { tagged } = this.props;
		const { selected } = this.state;
		return (
			<li
				className={classNames('tag-list-item', { selected: i === selected })}
				data-tag={tag}
				key={tag}
				onMouseDown={this.onSuggestionMouseDown}
			>
			<div className="checkbox">
				<Icon iconName="tag" />
			</div>
				<span className="text">{`"${tag}"(create new)`}</span>
			</li>
		);
	}

	onInputChange = (e) => {
		this.setState({
			input: e.currentTarget.value,
		});
		this.filterTags(e.currentTarget.value);
	}

	onInputBlur = (e) => {
		this.props.hide(e);
	}

	onSuggestionMouseDown = (e) => {
		this.toggleTag(e.currentTarget.getAttribute("data-tag"));
	}

	toggleTag = (tag) => {
		if (!tag) {
			return;
		}
		if (this.props.tagged[tag]) {
			this.props.removeNoteTag(this.props.noteId, tag);
		}
		else {
      if (this.props.tagged[tag] === undefined) {
        this.props.addTag(tag);
      }
			this.props.addNoteTag(this.props.noteId, tag);
		}
	}

	onInputKeydown = (e) => {
		const {
			filteredTags,
			selected,
		} = this.state;
		let nextSelection;
		switch(e.keyCode) {
			case 13:
				// enter
				if (this.state.selected >= 0) {
					this.toggleTag(this.state.filteredTags[this.state.selected]);
				}
        this.props.hide();
				break;
			case 38:
				// up arrow
				nextSelection = (selected - 1 + filteredTags.length) % filteredTags.length;
				this.setState({
					selected: nextSelection,
				});
				e.preventDefault();
				break;
			case 40:
				// down arrow
				nextSelection = (selected + 1) % filteredTags.length;
				this.setState({
					selected: nextSelection,
				})
				e.preventDefault();
				break;
			default:
		}
	}

	filterTags(keyword) {
		const tags = Object.keys(this.props.tagged).filter(tag => tag !== '')
			.filter(tag => tag.toLowerCase().startsWith(keyword.toLowerCase()))
			.sort();
		if (keyword !== '' && this.props.tagged[keyword] === undefined) {
			tags.unshift(keyword);
		}
		this.setState({
			input: keyword,
			filteredTags: tags,
			selected: 0,
		});
	}
}

export default TagPickerPopover;
