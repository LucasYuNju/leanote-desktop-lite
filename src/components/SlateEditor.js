import MarkupIt, { BLOCKS, INLINES, TABLE_ALIGN, MARKS, CONTAINERS, VOID } from 'markup-it';
import markdown from 'markup-it/lib/markdown';
import React, { Component, PropTypes } from 'react';
import Slate, { Editor, State, Text, Inline, Block } from 'slate';

import schema from '../constants/SlateSchema';
import { prettify, getMarkAt, wrapMark, unwrapMark } from '../util/slate';

const OPTIONS = { normalize: false };
const linkRegex = /\[([^\]]+)\]\(([^\)]*)\)/;

class SlateEditor extends Component {
  static propTypes = {
    note: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      state: deserializeToState(''),
    };
    this.lastMark = {};
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.note.isMarkdown) {
      console.error('Only markdown note is supported');
      return;
    }

    this.setState({
      state: deserializeToState(nextProps.note.content),
    });
  }

  render() {
    return (
      <div className="editor">
        <Editor
          className="slate-editor markdown-body"
          onBeforeInput={this.onBeforeInput}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onDocumentChange={this.onDocumentChange}
          onKeyDown={this.onKeyDown}
          onPaste={this.onPaste}
          onSelectionChange={this.onSelectionChange}
          placeholder="Enter text here..."
          ref="slate"
          schema={schema}
          state={this.state.state}
        />
      </div>
    )
  }

  onPaste = () => {
    // 粘贴的图片都上传
  }

  onSelectionChange = (selection, state) => {
    const initialState = state;
    const { startBlock, startOffset, startText } = state;
    const prev = state.document.getPreviousSibling(startText.key);
    const isPrevLink = prev && prev.type === INLINES.LINK && selection.startOffset === 0;
    const next = state.document.getNextSibling(startText.key);
    const isNextLink = next && next.type === INLINES.LINK && selection.startOffset === state.startText.length;
    if (state.document.getParent(startText.key).type === INLINES.LINK || isPrevLink || isNextLink) {
      if (isPrevLink) { // 遇到换行，将selection移动到前一个text，这次移动不会触发selectionChange事件
        state = state.transform()
          .collapseToEndOfPreviousText()
          .apply(OPTIONS);
      } else if (isNextLink) {
        state = state.transform()
          .collapseToStartOfNextText()
          .apply(OPTIONS);
      }
      const parent = state.document.getParent(state.startText.key);
      if (parent.type === INLINES.LINK) { // Selection进入一个link元素，将link元素替换成link源码
        if (!linkRegex.exec(parent.text)) {
          state = state.transform()
            .collapseToStartOf(state.startText)
            .extendToEndOf(state.startText)
            .delete()
            .insertInline(Inline.create({
              data: { href: parent.data.get('href') },
              type: INLINES.LINK,
              nodes: [ Text.createFromString(`[${parent.text}](${parent.data.get('href')})`) ]
            }), OPTIONS)
            .apply(OPTIONS);
          setTimeout(() => {
            // setState必须异步调用，否则会出现先修改state，然后用户输入生效的情况
            this.setState({ state });
          });
          // 为了处理从一个lik跳到另一个link的情况，必须在修改this.lastStartText之前convertSrcToLink
          setTimeout(() => {
            const nextState = this.convertSrcToLink(state);
            if (nextState !== state) {
              this.setState({ state: nextState });
            }
            this.lastStartText = state.startText;
          });
        }
      }
    } else {
      let match = linkRegex.exec(startText.text);
      if (match) { // 将link源码解析成link元素，目前只允许按顺序写link
        state = state.transform()
          .extendBackward(match[1].length + match[2].length + 4)
          .delete()
          .insertInline(Inline.create({
            data: { href: match[2] },
            type: INLINES.LINK,
            nodes: [ Text.createFromString(`[${match[1]}](${match[2]})`) ]
          }))
          .collapseToEndOfNextText()
          .apply(OPTIONS);
        this.lastStartText = state.document.getPreviousText(state.startText.key);
      }
      setTimeout(() => {
        this.setState({ state });
      });
    }
    setTimeout(() => {
      const prevState = state;
      state = this.convertSrcToLink(state);
      if (state !== prevState) {
        this.setState({ state });
      }
    });

    this.autoMarkdownMarks(selection, state);
  }

  autoMarkdownMarks = (selection, state) => {
    console.log('selection change', 'last', prettify(this.lastMark));
    const initialState = state;
    if (this.lastMark.type) { // 将上一个mark的源码替换成实际内容
      if(!state.selection.isFocused || this.lastMark.startText.key !== state.startText.key ||
        (this.lastMark.from > state.selection.anchorOffset || this.lastMark.to + 1 < state.selection.anchorOffset)
      ) {
        console.log(1);
        state = this.convertSrcToMark(state);
      }
    }

    let mark = getMarkAt(state.startText, selection.anchorOffset);
    if (!mark.type) {
      // 当前selection在mark的末尾，需要往前一个字符才能找到mark类型
      mark = getMarkAt(state.startText, selection.anchorOffset - 1);
    }
    if ([MARKS.BOLD, MARKS.ITALIC, MARKS.CODE].includes(mark.type) && state.selection.isFocused) { //如果Mark的内容不是源码，转成源码
      const text = state.startText.text.substring(mark.from, mark.to + 1);
      if (unwrapMark(text).text === text) {
        const wrapped = wrapMark(text, mark.type);
        const numAddedChars = wrapped.length - text.length;
        const nextAnchorOffset = state.selection.anchorOffset === mark.to + 1 ? mark.to + 1 + numAddedChars : state.selection.anchorOffset;
        console.log(2, text, mark);
        if (this.lastMark.startText && this.lastMark.startText.key === state.startText.key) {
          // 正在删除
          state = state.transform()
            .moveToOffsets(mark.from, mark.to + 1)
            .removeMark(mark.type)
            .moveTo(state.selection)
            .apply();
          this.lastMark = {};
        } else {
          // 第一次进入
          state = state.transform()
            .moveToOffsets(mark.from, mark.to + 1)
            .delete()
            .removeMark(MARKS.BOLD)
            .removeMark(MARKS.ITALIC)
            .removeMark(MARKS.CODE)
            .removeMark(MARKS.STRIKETHROUGH)
            .addMark(mark.type)
            .insertText(wrapped)
            .moveToOffsets(nextAnchorOffset, nextAnchorOffset)
            .apply();
        }
      }
    } else { //利用regex，从text中找到符合的代码，添加Mark标记
      const unwrapped = unwrapMark(state.startText.text);
      if (unwrapped.type) {
        console.log(3, unwrapped);
        state = state.transform()
          .moveToOffsets(unwrapped.index, unwrapped.index + unwrapped.text.length + unwrapped.numRemovedChars)
          .addMark(unwrapped.type)
          .moveTo(state.selection)
          .apply();
      }
    }
    if (state !== initialState) {
      setTimeout(() => {
        this.setState({ state });
      });
    }
    mark = getMarkAt(state.startText, selection.anchorOffset);
    if (!mark.type) {
      mark = getMarkAt(state.startText, selection.anchorOffset - 1);
    }
    if (mark.type) {
      this.lastMark = mark;
    }
    console.log('last mark', this.lastMark, mark);
  }

  /**
   * 将Mark源码转成Mark节点
   */
  convertSrcToMark = (state) => {
    if (this.lastMark.type) {
      const text = this.lastMark.startText.text.substring(this.lastMark.from, this.lastMark.to + 1);
      const unwrapped = unwrapMark(text);
      const placeholder = state.document.getDescendant(this.lastMark.startText.key);
      // 有可能被回车换到了下一行，或者cmd+Del被清空了，这时候就不需要unwrapMark了
      if (placeholder.text.length !== 0) {
        state = state.transform()
          .moveTo({
            anchorKey: this.lastMark.startText.key,
            focusKey: this.lastMark.startText.key,
            anchorOffset: this.lastMark.from,
            focusOffset: this.lastMark.to + 1,
          })
          .delete()
          .removeMark(MARKS.BOLD)
          .removeMark(MARKS.ITALIC)
          .removeMark(MARKS.CODE)
          .removeMark(MARKS.STRIKETHROUGH)
          .addMark(unwrapped.type)
          .insertText(unwrapped.text)
          .moveTo(state.selection)
          .apply(OPTIONS);
        this.lastMark = {};
      }
    }
    return state;
  }

  /**
   * 将link源码转成link节点
   */
  convertSrcToLink = (state) => {
    const parent = state.document.getParent(state.startText.key);
    const previous = state.document.getPreviousText(state.startText.key);
    const lastParent = this.lastStartText ? state.document.getParent(this.lastStartText.key) : null;
    if (previous && this.lastStartText && previous.key === this.lastStartText.key && state.startText.text.length === 0) return state;
    if (lastParent && lastParent.type === INLINES.LINK && (lastParent.key !== parent.key || !state.selection.isFocused)) {
      const match = linkRegex.exec(lastParent.text)
      const nextState = state.transform()
        .setNodeByKey(lastParent.key, { data: { href: match[2] } })
        .removeNodeByKey(this.lastStartText.key)
        .insertNodeByKey(lastParent.key, 0, Text.createFromString(match[1]))
        .apply(OPTIONS);
      this.lastStartText = state.startText;
      return nextState;
    }
    return state;
  }

  onBlur = () => {
    // onBlur在onSelectionChange之前
    setTimeout(() => {
      const text = serializeState(this.state.state);
      if (text !== this.props.note.content) {
        this.props.onChange(text);
      }
    }, 100);
  }

  onChange = (state) => {
    const { startBlock, startOffset, startText, selection } = state;
    this.setState({ state });
  }

  /**
   * Mark元素之后的输入不应该是Mark，需要在输入时做修改
   */
  onBeforeInput = (event, data, state) => {
    const mark = getMarkAt(state.startText, state.selection.anchorOffset - 1);
    if (mark && mark.to + 1 === state.selection.anchorOffset) {
      event.preventDefault();
      return state.transform()
        .removeMark(mark.type)
        .insertText(event.data)
        .apply();
    }
  }

  onKeyDown = (e, data, state) => {
    switch (data.key) {
      case 'space': return this.onSpace(e, state);
      case 'backspace': return this.onBackspace(e, state);
      case 'enter': return this.onEnter(e, state);
    }
  }

  /**
   * Get the block type for a series of auto-markdown shortcut `chars`.
   *
   * @param {String} chars
   * @return {String} block
   */
  getType = (chars) => {
    switch (chars) {
      case '*':
      case '-':
      case '+': return BLOCKS.LIST_ITEM;
      case '>': return BLOCKS.BLOCKQUOTE;
      case '#': return BLOCKS.HEADING_1;
      case '##': return BLOCKS.HEADING_2;
      case '###': return BLOCKS.HEADING_3;
      case '####': return BLOCKS.HEADING_4;
      case '#####': return BLOCKS.HEADING_5;
      case '######': return BLOCKS.HEADING_6;
      default: return null;
    }
  }

  /**
   * On space, if it was after an auto-markdown shortcut, convert the current
   * node into the shortcut's corresponding type.
   *
   * @param {Event} e
   * @param {State} state
   * @return {State or Null} state
   */
  onSpace = (e, state) => {
    if (state.isExpanded) return;
    const { startBlock, startOffset } = state;
    const chars = startBlock.text.slice(0, startOffset).replace(/\s*/g, '');
    const type = this.getType(chars);

    if (!type) return;
    if (type == BLOCKS.LIST_ITEM && startBlock.type == BLOCKS.LIST_ITEM) return;
    e.preventDefault();

    let transform = state
      .transform()
      .setBlock(type);

    if (type == BLOCKS.LIST_ITEM) transform.wrapBlock(BLOCKS.UL_LIST);

    state = transform
      .extendToStartOf(startBlock)
      .delete()
      .apply();

    return state;
  }

  /**
   * On backspace, if at the start of a non-paragraph, convert it back into a
   * paragraph node.
   *
   * @param {Event} e
   * @param {State} state
   * @return {State or Null} state
   */
  onBackspace = (e, state) => {
    if (state.isExpanded) return;
    if (state.startOffset != 0) return;
    const { startBlock } = state;

    if (startBlock.type == BLOCKS.PARAGRAPH) return;
    e.preventDefault();

    let transform = state
      .transform()
      .setBlock(BLOCKS.PARAGRAPH);

    if (startBlock.type == BLOCKS.LIST_ITEM) transform.unwrapBlock(BLOCKS.UL_LIST);

    state = transform.apply();
    return state;
  }

  /**
   * On return, if at the end of a node type that should not be extended,
   * create a new paragraph below it.
   *
   * @param {Event} e
   * @param {State} state
   * @return {State or Null} state
   */
  onEnter = (e, state) => {
    if (state.isExpanded) return;
    const { startBlock, startOffset, endOffset } = state;
    if (startOffset == 0 && startBlock.length == 0) return this.onBackspace(e, state);
    if (endOffset != startBlock.length) return;

    if (
      startBlock.type != BLOCKS.HEADING_1 &&
      startBlock.type != BLOCKS.HEADING_2 &&
      startBlock.type != BLOCKS.HEADING_3 &&
      startBlock.type != BLOCKS.HEADING_4 &&
      startBlock.type != BLOCKS.HEADING_5 &&
      startBlock.type != BLOCKS.HEADING_6 &&
      startBlock.type != BLOCKS.BLOCKQUOTE
    ) {
      return;
    }

    e.preventDefault();
    return state
      .transform()
      .splitBlock()
      .setBlock(BLOCKS.PARAGRAPH)
      .apply();
  }
}

/**
 * Transform Slate.state to markdown
 */
function serializeState(state) {
  const text = MarkupIt.State.create(markdown).serializeDocument(state.document);
  return text;
}

/**
 * Transform markdown to Slate.state
 */
function deserializeToState(text) {
  const document = MarkupIt.State.create(markdown).deserializeToDocument(text);
  const state = Slate.State.create({ document });
  return state;
}

export default SlateEditor;
