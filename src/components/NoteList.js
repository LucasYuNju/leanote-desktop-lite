import React, {
  Component,
  PropTypes
} from 'react';

class NoteList extends Component {
  static propTypes = {
    initialSelection: PropTypes.number,
    notes: PropTypes.array,
    view: PropTypes.string,
  };
  
  static defaultProps = {
    initialSelection: 0,
    view: 'snippet',
  };
  
  render() {
    return (
      <main>
        <div className="note-list">
          {this.state.notes.map()}
        </div>
        <div className="note-editor" />
      </main>
    );
  }
}

const NoteListItem = (props) => {
  return (
    <div class={props.selected ? 'note-list-item selecte' : 'note-list-item'}>
      
    </div>
  );
}
export default NoteList;
