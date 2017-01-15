import classNames from 'classnames';
import marked from 'marked';
import React, {Component, PropTypes} from 'react';

import { getThumbnail, getAbstract } from '../util/regex';
import Icon from '../components/Icon';
import SlateEditor from '../components/SlateEditor';
import TagBar from '../components/TagBar';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Note extends Component {
  static propTypes = {
		editMode: PropTypes.bool,
    note: PropTypes.object.isRequired,
		notebook: PropTypes.object.isRequired,
		allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateNote: PropTypes.func.isRequired,
		addNoteTag: PropTypes.func.isRequired,
		removeNoteTag: PropTypes.func.isRequired,
  };

  /**
   * 切换笔记时，利用CSS实现透明度从0到1的渐变动画
   * react-addons-css-transition-group只能在mount和unmount时修改class，无法实现这样的效果
   * 这里的实现是，在component重新render的时候，设置className为enter，然后立即添加新的className enter-active
   * 由于是通过DOM操作的方式修改class，react做dom diff的时候，会认为节点不变，所以要在className中加入note.noteId，强制更新class
   */
  render = () => {
    const {
			editMode,
			addNoteTag,
      note,
			notebook,
			allTags,
			removeNoteTag,
    } = this.props;
    return (
      <div
        className={`note enter ${note.noteId}`}
        ref="container"
      >
        <TagBar
          notebookTitle={notebook.title}
          noteId={note.noteId}
          noteTags={note.tags}
          title={note.title}
          onTitleChange={this.onTitleChange}
          removeNoteTag={removeNoteTag}
        />
        <SlateEditor
          active={note.isMarkdown}
          editMode={editMode}
          note={note}
          onChange={this.onContentChange}
        />
      </div>
    );
  }

  componentDidUpdate() {
    this.refs.container.classList.add('enter-active');
  }

  onTitleChange = (title) => {
    this.props.updateNote(this.props.note.noteId, { title });
  };

  onContentChange = (content) => {
    this.props.updateNote(this.props.note.noteId, {
      abstract: getAbstract(marked(content)),
      thumbnail: getThumbnail(content),
      content,
    });
  };
}

export default Note;
