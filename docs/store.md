
```
state = {
  entities: {
    notes: {
      20dr92: {
        NoteId: '20dr92',
        Title: 'wildlife',
      },
    }
    notebooks: {
      root: {
        Title: 'dumb notebook',
        NotebookId: 'root',
        NoteIds: [],  //empty
        Subs: ['57b574'],
      },
      57b574: {
        Title: 'Pictured Notebook'
        NotebookId: '57b574',
        NoteIds: [],
        Subs: [],
      },
    },
    tag: {
      // Leanote does not provide api to get note with a certain tag.
      1ys0a1: {
        tagId: 1ys001,
        Tag: 'TODO',
        NoteIds,
      }
    },
    noteList: {
      starred: {
        NoteIds,
      },
      searchResult: {
        NoteIds,
      }
    }
  },
  note: {
    selected: '20dr92',
  },
  noteList: {
    selected: {
      type: 'notebooks',  // or 'tags', 'noteList'
      id: '57b574',
    },
  }
  user: {},
}
```
