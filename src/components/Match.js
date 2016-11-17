import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { parseUrl } from '../util/RouteUtil';

// Route component
class Match extends Component {
  static propTypes = {
		component: PropTypes.func.isRequired,
		navigator: PropTypes.object.isRequired,
    pattern: PropTypes.string.isRequired,
  };

  render() {
		const { component: Component, navigator, pattern } = this.props;
		const params = parseUrl(pattern, navigator.path);
    return (
			<Component {...params}/>
		);
  }
}

function mapStateToProps(state) {
	return {
		navigator: state.navigator,
	};
}

export default connect(mapStateToProps)(Match);
