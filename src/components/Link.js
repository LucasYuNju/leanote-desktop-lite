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
	  dispatch: PropTypes.func.isRequired,
	  path: PropTypes.object.isRequired,
		style: PropTypes.object,
	};

  handleClick = (e) => {
    const { dispatch, path } = this.props;
    dispatch(navigateTo(path));
  };

  render() {
    const { children, className, path, style, title } = this.props;
    return (
      <a
        className={classNames(className, 'link')}
        href={`#/${constructUrl(path)}`}
        onClick={this.handleClick}
				style={style}
      >
        {children}
      </a>
    );
  }
}

export default connect()(Link);
