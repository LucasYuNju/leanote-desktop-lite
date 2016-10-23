/**
 * Code copied from https://github.com/Vnkitaev/react-summernote
 * Customize summernote.
 */
import React, { Component, PropTypes } from 'react';

import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/js/transition';
import 'bootstrap/dist/css/bootstrap.css';
import 'summernote/dist/summernote.css';
import 'summernote';

class SummernoteEditor extends Component {
  static propTypes = {
    className: PropTypes.string,
    note: PropTypes.object.isRequired,
    options: PropTypes.object,
    onInit: PropTypes.func,
    onEnter: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    onPaste: PropTypes.func,
    onChange: PropTypes.func,
    onImageUpload: PropTypes.func,
  };

  static defaultProps = {
    options: {
      dialogsInBody: true,
      disableResizeEditor: true,
      focus: true,
      lang: "en-US",
      minHeight: 300,
      toolbar: [
        ['fontname', ['fontname']],
        ['fontsize', ['fontsize']],
        ['font', ['bold', 'underline', 'clear']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['insert', ['link', 'picture']],
        ['view', ['codeview']]
      ],
      placeholder: 'Enter text here...',
      popover: {
        image: [],
        link: [],
        air: [],
      },
      defaultFontName: 'Helvetica Neue',
      fontNames: [
        'Arial', 'Courier New', 'Helvetica Neue', 'Lucida Sans', 'Tahoma', 'Times New Roman'
      ],
      fontNamesIgnoreCheck: [
        'Arial', 'Courier New', 'Helvetica Neue', 'Lucida Sans', 'Tahoma', 'Times New Roman'
      ],
      fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
    }
  }

  reset = () => {
    this.$editor.summernote('reset');
  };

  insertImage = (url, filenameOrCallback) => {
    this.$editor.summernote('insertImage', url, filenameOrCallback);
  };

  insertHtml = (html) => {
    this.$editor.summernote('code', html);
  };

  insertText = (text) => {
    this.$editor.summernote('insertText', text);
  };

  handleBlur = () => {
    const note = {
      ...this.props.note,
      Content: this.$editor.summernote('code'),
      Title: this.$title.val(),
    }
    this.props.onBlur(note);
  };

  componentWillReceiveProps(nextProps) {
    const note = this.props.note;
    const nextNote = nextProps.note;
    if (note.NoteId !== nextNote.NoteId) {
      this.reset();
      this.insertHtml(nextNote.Content);
      this.$title.val(nextNote.Title);
      this.$title.focus();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const content = this.props.note.Content;
    return (
      <div id="summernote" dangerouslySetInnerHTML={{ __html: content }} />
    );
  }

  componentDidMount() {
    const {
      onInit, onEnter, onFocus, onKeyup, onKeydown, onPaste, onChange, onImageUpload, options, note,
    } = this.props;
    options.callbacks = {
      onInit, onEnter, onFocus, onKeyup, onKeydown, onPaste, onChange, onImageUpload, onBlur: this.handleBlur,
    };
    this.$editor = $(`#summernote`);
    this.$editor.summernote(options);
    // this.insertHtml(note.Content);

    this.$toolbar = $('.note-toolbar');
    this.$editingArea = $('.note-editing-area');
    this.$title = $('<input class="note-title" placeholder="Title your note" />');
    this.$title.val(note.Title);
    this.$title.insertAfter(this.$toolbar);
    this.$title.on('input', onChange);
    this.$title.on('blur', this.handleBlur);
    this.$title.focus();

    $('.note-statusbar').hide();
    this.fixFontName();
    this.fixFontSize();
  }

  componentWillUnmount() {
    if (this.$editor) {
      this.$editor.summernote('destroy');
    }
  }

  /**
   * After font selection, fontName displayed in toolbar will not change until user input something.
   * This is a hack to make toolbar update immediately.
   */
  fixFontName = () => {
    $('.dropdown-fontname').on('click', 'li > a', (event) => {
      const fontName = $(event.currentTarget).data('value');
      $('.note-current-fontname').text(fontName);
      const $font = $(`<font face=${fontName}></font>`);
      this.insertHtml($font[0]);
    });
  }

  // A hack to make toolbar update immediately.
  fixFontSize = () => {
    $('.dropdown-fontsize').on('click', 'li > a', (event) => {
      const fontSize = $(event.currentTarget).data('value');
      $('.note-current-fontsize').text(fontSize);
    });
  }
}

export default SummernoteEditor;
