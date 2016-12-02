import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import Icon from '../components/Icon';

// TODO create SearchBarContainer
class SearchBox extends Component {
  static propTypes = {
		navigateBack: PropTypes.func.isRequired,
		navigateForward: PropTypes.func.isRequired,
		navigateBackEnabled: PropTypes.bool,
		navigateForwardEnabled: PropTypes.bool,
    placeholder: PropTypes.string,
    search: PropTypes.func,
  };

  static defaultProps = {
    placeholder: 'Search',
  };

  state = {
    input: '',
  }

  handleInputChange = (event) => {
    this.setState({
      input: e.target.value,
    });
  }

  render() {
		const {
			navigateBackEnabled,
			navigateForwardEnabled,
		} = this.props;
    return (
			<div className="search-bar-container">
				<div
					className={classNames('btn', 'btn-search-bar', { 'btn-disabled': !navigateBackEnabled })}
					onClick={this.handleNavigateBack}
				>
					<Icon
						className="back-icon"
						iconName="chevron-left"
					/>
				</div>
				<div
					className={classNames('btn', 'btn-search-bar', { 'btn-disabled': !navigateForwardEnabled })}
					onClick={this.handleNavigateForward}
				>
					<Icon
						className="forward-icon"
						iconName="chevron-right"
					/>
				</div>
				<div className="search-bar">
					<input
						type="search"
						className="osx-button"
						placeholder={this.props.placeholder}
						value={this.state.input}
						onChange={this.handleInputChange}
					/>
					<Icon
						className="search-icon"
						iconName="search"
					/>
				</div>
			</div>
    );
  }

	handleNavigateBack = () => {
		if (this.props.navigateBackEnabled) {
			this.props.navigateBack();
		}
	};

	handleNavigateForward = () => {
		if (this.props.navigateForwardEnabled) {
			this.props.navigateForward();
		}
	};
}

export default SearchBox;
