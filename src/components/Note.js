import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';

import Icon from '../components/Icon';
import NoteActionBar from '../components/NoteActionBar';
import NoteEditor from '../components/NoteEditor';
import MarkdownEditor from '../components/MarkdownEditor';

class Note extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    editMode: !this.props.note.IsMarkdown,
  };

  handleChange = (note) => {
    this.props.onChange(note);
  };
  
  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };
  
  renderActionBar() {
    return (
      <div className="action-bar">
        <div className="tags" />
        <div className="osx-buttons actions">
          {this.props.note.IsMarkdown ? 
            <div
              onClick={this.toggleEditMode}
              className={classNames('osx-button', {active: this.state.editMode})}
            >
              <Icon iconName="pencil" />
            </div>
            : null
          }
          <div className="osx-button">
            <Icon iconName="history" />
          </div>
          <div className="osx-button">
            <Icon iconName="trashcan" />
          </div>
        </div>
      </div>
    );
  }
  
  render () {
    const {
      Content,
      IsMarkdown,
    } = this.props.note;
    const {
      editMode,
    } = this.state;
    return (
      <div className={classNames('note', { edit: editMode }, { preview: !editMode })}>
        {this.renderActionBar()}
        <NoteEditor
          note={this.props.note}
          onChange={this.handleChange}
        />
        <MarkdownEditor value={Content} />
      </div>
    );
  }
}

export default Note;
