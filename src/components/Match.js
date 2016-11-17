import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

// Route component
class Match extends Component {
  static propTypes = {
		component: PropTypes.element.isRequired,
		navigator: PropTypes.object.isRequired,
    pattern: PropTypes.string.isRequired,
  };

  render() {
    return component;
  }
}

function mapStateToProps(state) {
	return {
		navigator: state.navigator,
	};
}

export default connect(mapStateToProps)(Match);
