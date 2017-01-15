import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import Icon from '../components/Icon';

// 导航相关的逻辑最初写在了RouterActions里面。放在这里的主要有考虑到两点：
// 1. 其他组件只关心当前的url，而不关心用户的前进后退操作，history相关的状态不需要放在全局的state里
// 2. redux的state进行了持久化，但是history相关的状态不应该被持久化
class Navigator extends Component {
  static propTypes = {
    changePath: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    search: PropTypes.func,
  };

  static defaultProps = {
    placeholder: 'Search',
  };

  constructor(props) {
    super(props);
    this.ignoreHashChangeOnce = false;
    // State records current page's position in h5 history stack.
    this.state = {
      input: '',
      current: 1,
      length: 1,
    };
  }

  render() {
    return (
			<div className="search-bar-container">
				<div
					className={classNames('btn', { 'btn-disabled': this.state.current <= 1 })}
					onClick={this.onNavigateBack}
				>
					<Icon
						className="back-icon"
						iconName="chevron-left"
					/>
				</div>
				<div
					className={classNames('btn', { 'btn-disabled': this.state.current >= this.state.length })}
					onClick={this.onNavigateForward}
				>
					<Icon
						className="forward-icon"
						iconName="chevron-right"
					/>
				</div>
				<div className="search-bar">
					<input
						type="search"
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

  componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange);
  }

  handleInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  }

  onHashChange = (e) => {
    if (this.ignoreHashChangeOnce) {
      this.ignoreHashChangeOnce = false;
    }
    else {
      this.setState({
        current: this.state.current + 1,
        length: this.state.current + 1,
      });
    }
  }

	onNavigateBack = () => {
    if (this.state.current > 1) {
      this.setState({
        current: this.state.current - 1,
      });
      this.ignoreHashChangeOnce = true;
      window.history.back();
    }
	};

	onNavigateForward = () => {
    if (this.state.current < this.state.length) {
      this.setState({
        current: this.state.current + 1,
      });
      this.ignoreHashChangeOnce = true;
      window.history.forward();
    }
	};
}

export default Navigator;
