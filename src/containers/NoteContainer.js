import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import Note from '../components/Note';
import * as NoteActionCreators from '../actions/NoteActions';
import { parseUrl } from '../util/RouteUtil';

class NoteContainer extends Component {
  render() {
    if (this.props.note) {
      return (
        <Note
          note={this.props.note}
					notebook={this.props.notebook}
          onChange={this.props.updateNote}
        />
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  const {
    entities,
  } = state;
	const params = parseUrl('/(.*)/(.*)/notes/:noteId', state.navigator.path) || {};
	const {
		noteId,
	} = params;
	const ret = {};
  if (noteId) {
    ret.note = entities.notes.byId[noteId];
		ret.notebook = entities.notebooks.byId[ret.note.notebookId];
  }
	return ret;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
