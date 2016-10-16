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
    value: PropTypes.string,
    options: PropTypes.object,
    onInit: PropTypes.func,
    onEnter: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    onPaste: PropTypes.func,
    onChange: PropTypes.func,
    onImageUpload: PropTypes.func
  };
  
  reset = () => {
    this.editor.summernote('reset');
  };

  insertImage = (url, filenameOrCallback) => {
    this.editor.summernote('insertImage', url, filenameOrCallback);
  };

  insertNode = (node) => {
    this.editor.summernote('insertNode', node);
  };

  insertText = (text) => {
    this.editor.summernote('insertText', text);
  };

  /**
   * After font selection, fontName displayed in toolbar will not change until user input something.
   * This is a hack way to make toolbar update immediately.
   */
  fixFontName = () => {
    $('.dropdown-fontname').on('click', 'li > a', (event) => {
      const fontName = $(event.currentTarget).data('value');
      $('.note-current-fontname').text(fontName);
      const $font = $(`<font face=${fontName}></font>`);
      this.insertNode($font[0]);
    });
  }

  // A hack way to make toolbar update immediately.
  fixFontSize = () => {
    $('.dropdown-fontsize').on('click', 'li > a', (event) => {
      const fontSize = $(event.currentTarget).data('value');
      $('.note-current-fontsize').text(fontSize);
    });
  }

  constructor(props) {
    super(props);
    this.editor = {};
  }

  componentDidMount() {
    const options = this.props.options || {};
    options.callbacks = this.callbacks;
    options.disableResizeEditor = true;

    this.editor = $(`#summernote`);
    this.editor.summernote(options);
    this.manageModalScroll(true);    
    $('.note-statusbar').hide();
    
    this.fixFontName();
    this.fixFontSize();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      if (this.props.value !== nextProps.value) {
        this.editor.summernote('code', nextProps.value);        
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (this.editor) this.editor.summernote('destroy');
    this.manageModalScroll(false);
  }

  manageModalScroll(mount) {
    const $body = $('body');
    let hasClassName = false;
    if (mount) {
      $('.note-editor .modal').on('show.bs.modal', () => {
        hasClassName = $body.hasClass('modal-open');
      });
      $('.note-editor .modal').on('hidden.bs.modal', () => {
        $body.toggleClass('modal-open', hasClassName);
      });
    } else {
      $('.note-editor .modal').off('show.bs.modal');
      $('.note-editor .modal').off('hidden.bs.modal');
    }
  }

  get callbacks() {
    const props = this.props;

    return {
      onInit: props.onInit,
      onEnter: props.onEnter,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      onKeyup: props.onKeyUp,
      onKeydown: props.onKeyDown,
      onPaste: props.onPaste,
      onChange: props.onChange,
      onImageUpload: props.onImageUpload
    };
  }

  render() {
    return <div id="summernote" dangerouslySetInnerHTML={{ __html: this.props.value }}></div>;
  }
}

export default SummernoteEditor;
