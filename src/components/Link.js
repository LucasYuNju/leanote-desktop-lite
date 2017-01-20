import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

// Container component
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
      to = this.props.router.path.replace(regex, to)
    }
    if (!to.startsWith('#')) {
      to = '#' + to;
    }
    return to;
  }

  render() {
    const { children, className, style, title, to, router, dispatch, ...other } = this.props;
    return (
      <a
        className={classNames(className, 'link')}
        href={this.createHref(to)}
        onClick={this.handleClick}
        style={style}
        {...other}
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
		router: state.router,
	}
};

export default connect(mapStateToProps)(Link);
