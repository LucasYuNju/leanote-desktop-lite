import { BLOCKS, INLINES, TABLE_ALIGN, MARKS, CONTAINERS, VOID } from 'markup-it';
import React from 'react';

const schema = {
  nodes: {
    // Inlines
    [INLINES.LINK]: props => <a href={props.node.data.get('href')} {...props.attributes}>{props.children}</a>,
    [INLINES.IMAGE]: props => <img src={props.node.data.get('src')} {...props.attributes} />,
    // Classic blocks
    [BLOCKS.BLOCKQUOTE]: props => <blockquote {...props.attributes}>{props.children}</blockquote>,
    [BLOCKS.CODE]: props => <pre {...props.attributes}>{props.children}</pre>,
    [BLOCKS.CODE_LINE]: props => <div {...props.attributes}>{props.children}</div>,
    [BLOCKS.PARAGRAPH]: props => <p {...props.attributes}>{props.children}</p>,
    [BLOCKS.HR]: props => <hr {...props.attributes} />,
    // Headings
    [BLOCKS.HEADING_1]: props => <h1 {...props.attributes}>{props.children}</h1>,
    [BLOCKS.HEADING_2]: props => <h2 {...props.attributes}>{props.children}</h2>,
    [BLOCKS.HEADING_3]: props => <h3 {...props.attributes}>{props.children}</h3>,
    [BLOCKS.HEADING_4]: props => <h4 {...props.attributes}>{props.children}</h4>,
    [BLOCKS.HEADING_5]: props => <h5 {...props.attributes}>{props.children}</h5>,
    [BLOCKS.HEADING_6]: props => <h6 {...props.attributes}>{props.children}</h6>,
    // Lists
    [BLOCKS.OL_LIST]: props => <ol {...props.attributes}>{props.children}</ol>,
    [BLOCKS.UL_LIST]: props => <ul {...props.attributes}>{props.children}</ul>,
    [BLOCKS.LIST_ITEM]: props => <li {...props.attributes}>{props.children}</li>,
    // Tables
    [BLOCKS.TABLE]: props => <table {...props.attributes}><tbody>{props.children}</tbody></table>,
    [BLOCKS.TABLE_ROW]: props => <tr {...props.attributes}>{props.children}</tr>,
    [BLOCKS.TABLE_CELL]: props => <td {...props.attributes}>{props.children}</td>,
    [BLOCKS.TEXT]: props => <span {...props.attributes}>{props.children}</span>,
    [BLOCKS.DEFAULT]: props => <p {...props.attributes}>{props.children}</p>,
  },
  marks: {
    [MARKS.BOLD]: props => <strong>{props.children}</strong>,
    [MARKS.CODE]: props => <code {...props.attributes}>{props.children}</code>,
    [MARKS.ITALIC]: props => <em>{props.children}</em>,
    [MARKS.STRIKETHROUGH]: props => <strike {...props.attributes}>{props.children}</strike>,
  }
}

export default schema;
