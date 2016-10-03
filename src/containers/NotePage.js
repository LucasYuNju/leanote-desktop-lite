import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderContainer from './HeaderContainer';
import NavContainer from './NavContainer';
import NoteList from '../components/NoteList';
import WindowUtil from '../util/WindowUtil';
import * as ActionCreators from '../actions';

class NotePage extends Component {
  componentWillMount() {
    WindowUtil.setProperties({
      resizable: true,
      width: 1000,
      height: 660,
    });
  }

  componentDidMount() {
    this.props.actions.initNotebooks();
  }

  render() {
    const {
      notebooks,
      selectedNotebook,
    } = this.props;
    
    return (
      <div className="note-page">
        <HeaderContainer />
        <div className="content">
          <NavContainer notebooks={notebooks}/>
          <NoteList/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notebooks: state.notebooks,
    selectedNote: state.selectedNote,
    selectedNotebook: state.selectedNotebook,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);
