import { BLOCKS, INLINES, MARKS } from 'markup-it';

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
    console.log(characters[anchorOffset].marks);
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
    case MARKS.CODE:
      return "`" + text + "`";
    case MARKS.STRIKETHROUGH:
      return `~~${text}~~`;
    default:
      return text;
  }
}

const boldRegex = /\*\*([^\*]+)\*\*/;
const italicRegex = /(?:^|[^\*]+)\*([^\*]+)\*/;     // '**bold*'不应该识别为italic
const codeRegex = /`([^`]+)`/;
const strikeThroughRegex = /~~([^~]+)~~/;


export function unwrapMark(text) {
  let match;
  if (match = boldRegex.exec(text)) {
    return {
      index: match.index,
      text: match[1],
      type: MARKS.BOLD,
      numRemovedChars: 4,
    };
  }
  if (match = italicRegex.exec(text)) {
    return {
      index: match.index,
      text: match[1],
      type: MARKS.ITALIC,
      numRemovedChars: 2,
    };
  }
  if (match = codeRegex.exec(text)) {
    return {
      index: match.index,
      text: match[1],
      type: MARKS.CODE,
      numRemovedChars: 2,
    };
  }
  if (match = strikeThroughRegex.exec(text)) {
    return {
      index: match.index,
      text: match[1],
      type: MARKS.STRIKETHROUGH,
      numRemovedChars: 4,
    };
  }
  return {
    text,
    removed: 0,
  };
}
