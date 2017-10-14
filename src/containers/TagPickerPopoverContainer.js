import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import TagPickerPopover from '../components/TagPickerPopover';
import * as TagActions from '../actions/TagActions';

class TagPickerPopoverContainer extends Component {
	render () {
		return <TagPickerPopover {...this.props} />;
	}
}

function mapStateToProps (state) {
	const {
    entities,
		router,
  } = state;
	const tagged = {};
	const noteId = router.params.noteId;
	const TAGKEYS = entities.tags && Object.keys(entities.tags);
	const TAGS = entities.notes[noteId] && entities.notes[noteId].tags;
	const TAGKEYSSET = (TAGKEYS, bool) => TAGKEYS.forEach(tag => tagged[tag] = bool);
	TAGS && TAGKEYSSET(TAGS, true);
	TAGKEYS && TAGKEYSSET(TAGKEYS, false);
	return {
		tagged,
		noteId,
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(TagActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TagPickerPopoverContainer);
