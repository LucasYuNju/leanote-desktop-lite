
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
      // better use rootIds
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
    tags: {
      // Leanote does not provide api to get note with a certain tag.
      1ys0a1: {
        tagId: 1ys001,
        Tag: 'TODO',
        NoteIds,
      }
    },
    noteLists: {
      starred: {
        NoteIds,
      },
      searchResult: {
        NoteIds,
      }
    }
  },
  note: {
    id: '20dr92',
  },
  noteList: {
    type: 'notebooks',  // or 'tags', 'noteLists'
    id: '57b574',
    order: {
      key,
      ascending,
    }
  }
  user: {
    id,
  },
}
```
