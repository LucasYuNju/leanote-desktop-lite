import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { navigateTo } from '../actions/NavigatorActions';
import { constructUrl } from '../util/RouteUtil';

// Route component
class Link extends Component {
	static propTypes = {
	  children: PropTypes.node,
	  className: PropTypes.string,
		onClick: PropTypes.func,
	  to: PropTypes.string.isRequired,
		style: PropTypes.object,
	};

	static defaultProps = {
		onClick: () => {},
	}

	createHref(to) {
		if (!to.startsWith('/')) {
			const regex = /[^\/]*$/;
			to = this.props.navigator.path.replace(regex, to)
		}
		if (!to.startsWith('#')) {
			to = '#' + to;
		}
		return to;
	}

  render() {
    const { children, className, style, title, to } = this.props;
    return (
      <a
        className={classNames(className, 'link')}
        href={this.createHref(to)}
        onClick={this.handleClick}
				style={style}
      >
        {children}
      </a>
    );
  }

	handleClick = (e) => {
		this.props.onClick(e);
		return true;
	};
}

function mapStateToProps(state) {
	return {
		navigator: state.navigator,
	}
};

export default connect(mapStateToProps)(Link);
