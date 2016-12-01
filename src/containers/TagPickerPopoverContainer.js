import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import TagPickerPopover from '../components/TagPickerPopover';
import * as TagActions from '../actions/TagActions';
import { parseUrl } from '../util/RouteUtil';

class TagPickerPopoverContainer extends Component {
  render() {
    return (
      <TagPickerPopover {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {
    entities,
		navigator,
  } = state;
	const params = parseUrl('/(.*)/(.*)/notes/:noteId', navigator.path) || {};
	const tagged = {};
	Object.keys(entities.tags).forEach(tag => {
		tagged[tag] = false;
	});
	entities.notes[params.noteId].tags.forEach(tag => {
		tagged[tag] = true;
	});
	return {
		tagged,
		noteId: params.noteId,
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TagActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TagPickerPopoverContainer);
