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

  render() {
    const { children, className, style, title, to } = this.props;
    return (
      <a
        className={classNames(className, 'link')}
        href={`#/notebooks/${to}`}
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

export default connect()(Link);
