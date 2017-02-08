import { BLOCKS, INLINES, MARKS } from 'markup-it';

const boldRegex = /\*\*([^\*]+)\*\*/;
const italicRegex = /\*([^\*]+)\*/;

export function prettify(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 找到offset所在character的mark类型，以及相邻的所有具有相同mark类型的character的range
 * 为了易于实现，假定不会出现多个mark嵌套的情况
 */
export function getMarkAt(text, anchorOffset) {
  const characters = text.characters.toJS();
  if (anchorOffset >= 0 && characters.length > anchorOffset && characters[anchorOffset].marks.length) {
    const type = characters[anchorOffset].marks[0].type;
    let from = anchorOffset, to = anchorOffset;
    for(; from > 0 && characters[from - 1].marks.length && characters[from - 1].marks[0].type === type; from--);
    for(; to < characters.length - 1 && characters[to + 1].marks.length && characters[to + 1].marks[0].type === type; to++);
    return { type, from, to, startText: text };
  }
  return {};
}

/**
 * text => `**${text}**`
 */
export function wrapMark(text, type) {
  switch (type) {
    case MARKS.BOLD:
      return `**${text}**`;
    case MARKS.ITALIC:
      return `*${text}*`;
    default:
      return text;
  }
}

export function unwrapMark(text) {
  let match;
  if (match = boldRegex.exec(text)) {
    return {
      index: match.index,
      text: match[1],
      type: MARKS.BOLD,
      stripped: 4,
    };
  }
  if (match = italicRegex.exec(text)) {
    return {
      index: match.index,
      text: match[1],
      type: MARKS.ITALIC,
      stripped: 2,
    };
  }
  return {};
}
