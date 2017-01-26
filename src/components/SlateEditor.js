import MarkupIt, { BLOCKS, INLINES, TABLE_ALIGN, MARKS, CONTAINERS, VOID } from 'markup-it';
import markdown from 'markup-it/lib/markdown';
import React, { Component, PropTypes } from 'react';
import Slate, { Editor, State, Text, Inline, Block } from 'slate';

import schema from '../constants/SlateSchema';

const OPTIONS = { normalize: false };
const linkRegex = /\[([^\]]*)\]\(([^\)]*)\)/;

class SlateEditor extends Component {
  static propTypes = {
    note: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    state: deserializeToState(''),
  };

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
    console.log(prettify(state));
    const { startBlock, startOffset, startText } = state;
    const parent = state.document.getParent(startText.key);
    if (parent.type !== INLINES.LINK) {
      // 有没有编辑的事件，放在那更直观
      // 刚刚编辑完一个link，将markdown源码解析成link
      const match = linkRegex.exec(startText.text);
      if (match && match.length === 3) {
        const from = match.index, to = match.index + match[0].length;
        const nodes = [];
        nodes.push(Inline.create({
          type: INLINES.LINK,
          data: { href: match[2] },
          isVoid: false,
          nodes: [
            // 直接放两个Text，会被合并
            Text.createFromString(`[${match[1]}]`),
            Text.createFromString(`(${match[2]})`),
          ],
        }));

        console.log(parent.type, prettify(selection));
        console.log(match[1].length + match[2].length + 4);
        // 不能放在selection change里，selection change早于oninput
        const nextState = state.transform()
          // .deleteAtRange(selection)
          // .insertInlineAtRange(selection, Inline.create({
          //   data: { href: 'you' },
          //   type: INLINES.LINK,
          //   nodes: [ Text.createFromString('fuck') ]
          // }))
          // 这个版本更简单一些
          .deleteBackward(match[1].length + match[2].length + 4)
          // .insertInline(Inline.create({
          //   data: { href: match[2] },
          //   type: INLINES.LINK,
          //   nodes: [ Text.createFromString(match[1]) ]
          // }))
          .apply(OPTIONS);
        this.setState({ state: nextState });
      }
    } else {
      // 用户进入一个link，将link替换成markdown源码
      if (!linkRegex.exec(parent.text)) {
        console.log('enter link', parent.text, prettify(parent));
        const nextState = state.transform()
          .removeNodeByKey(startText.key)
          .insertNodeByKey(parent.key, 0, Text.createFromString(`[${parent.text}](${parent.data.get('href')})`))
          .apply(OPTIONS);
        this.setState({ state: nextState });
      }
    }
    if (this.prevParent && this.prevParent!== parent && this.prevParent.type === INLINES.LINK) {
      // 离开一个LINK，转成anchor
      const match = linkRegex.exec(this.prevParent.text)
      console.log('exit link', this.prevParent.text, prettify(this.prevParent));
      if (!match) {
        console.error('No alias and href found in link');
        // return;
      } else {
        const alias = match[1] || 'alis';
        const href = match[2] || 'href';

        // 凎，就没有删除所有子元素的方法吗
        const nextState = state.transform()
          .setNodeByKey(this.prevParent.key, { data: { href } })
          .removeNodeByKey(this.prevStartText.key)
          .insertNodeByKey(this.prevParent.key, 0, Text.createFromString(alias))
          .apply(OPTIONS);
        this.setState({ state: nextState });
      }
    }
    console.log(parent.key, parent.type);
    this.prevStartText = startText;
    this.prevParent = parent;
  }

  onBlur = () => {
    const text = serializeState(this.state.state);
    if (text !== this.props.note.content) {
      this.props.onChange(text);
    }
  }

  onChange = (state) => {
    this.setState({ state })
  }

  onKeyDown = (e, data, state) => {
    switch (data.key) {
      case 'space': return this.onSpace(e, state)
      case 'backspace': return this.onBackspace(e, state)
      case 'enter': return this.onEnter(e, state)
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
      default: return null
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
    if (state.isExpanded) return
    const { startBlock, startOffset } = state
    const chars = startBlock.text.slice(0, startOffset).replace(/\s*/g, '')
    const type = this.getType(chars)

    if (!type) return
    if (type == BLOCKS.LIST_ITEM && startBlock.type == BLOCKS.LIST_ITEM) return
    e.preventDefault()

    let transform = state
      .transform()
      .setBlock(type)

    if (type == BLOCKS.LIST_ITEM) transform.wrapBlock(BLOCKS.UL_LIST)

    state = transform
      .extendToStartOf(startBlock)
      .delete()
      .apply()

    return state
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
    if (state.isExpanded) return
    if (state.startOffset != 0) return
    const { startBlock } = state
    if (startBlock.type == BLOCKS.PARAGRAPH) return
    if (startBlock.length === 0 && startBlock.text === '') {
      return
    }
    e.preventDefault()

    let transform = state
      .transform()
      .setBlock(BLOCKS.PARAGRAPH)

    if (startBlock.type == BLOCKS.LIST_ITEM) transform.unwrapBlock(BLOCKS.UL_LIST)

    state = transform.apply()
    return state
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
    if (state.isExpanded) return
    const { startBlock, startOffset, endOffset } = state
    if (startOffset == 0 && startBlock.length == 0) return this.onBackspace(e, state)
    if (endOffset != startBlock.length) return

    if (
      startBlock.type != BLOCKS.HEADING_1 &&
      startBlock.type != BLOCKS.HEADING_2 &&
      startBlock.type != BLOCKS.HEADING_3 &&
      startBlock.type != BLOCKS.HEADING_4 &&
      startBlock.type != BLOCKS.HEADING_5 &&
      startBlock.type != BLOCKS.HEADING_6 &&
      startBlock.type != BLOCKS.BLOCKQUOTE
    ) {
      return
    }

    e.preventDefault()
    return state
      .transform()
      .splitBlock()
      .setBlock(BLOCKS.PARAGRAPH)
      .apply()
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
  // trim empty spans
  const blocks = state.document.getBlocks();
  const transform = state.transform();
  blocks.forEach(block => {
    block.nodes.forEach(node => {
      if (node.text === '' && node.key !== '0') {
        transform.removeNodeByKey(node.key, OPTIONS);
      }
    });
  });
  return transform.apply({ normalize: false });
}

function prettify(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function insertBefore(state, after, nodes) {
  const parent = state.document.getParent(after);
  const index = parent.nodes.find(node => node.key === node.key);

  const transform = state.transform();
  transform.removeNodeByKey(after.key);
  nodes.reverse().forEach((newNode, i) => transform.insertNodeByKey(parent.key, index, newNode));
  const nextState = transform.apply(OPTIONS);
  console.log(prettify(nextState.document));
  return nextState;
}

export default SlateEditor
