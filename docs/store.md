
```
state = {
  index: {
    note: {
      20dr92: {
        NoteId: '20dr92',
        Title: 'wildlife',
      },
    }
    notebook: {
      root: {
        Title: 'dumb notebook',
        NotebookId: 'root',
        NoteIds: [],  //empty
        ChildIds: ['57b574'],
      },
      latest: {
        Title: 'dumb notebook',
        limit: 100,
        NotebookId: 'root',
        NoteIds: ['20dr92', 'sajweow'],
        ChildIds: [],  //empty
      },
      57b574: {
        Title: 'Pictured Notebook'
        NotebookId: '57b574',
        NoteIds: [],
        ChildIds: [],
      },
    },
    tag: {
      // Leanote does not provide api to get note withs a certain tag.
      1ys0a1: {
        tagId: 1ys001,
        Title: 'TODO'
      }
    }
  },
  note: {
    selected: '20dr92',
  },
  noteList: {
    selected: { type: notebook, id: '57b574' },
    // or { type: tag, id: 'TODO' },
    searchResult: [],
  }
  user: {},
}
```
