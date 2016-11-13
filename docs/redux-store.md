
```
state = {
  entities: {
    notes: {
      searchedIds: [],
      starredIds: [],
      byId: {
        20dr92: {
          noteId: '20dr92',
          title: 'wildlife',
        },
      }
    }
    notebooks: {
      rootIds: [],
      byId: {
        57b574: {
          title: 'Pictured Notebook'
          notebookId: '57b574',
          noteIds: [],
          subs: [],
        },
      }
    },
    tags: {
      // derived
			allIds: [],
      byTag: {
        TODO: {
          tag: 'TODO',
          noteIds,
        }
      },
    },
    users: {
      byId: {
        512178: {
          id: '512178',
          name: 'bot',
        }
      }
    }
  },
  note: {
    id: '20dr92',
  },
  noteList: {
    type: 'notebooks',  // or 'tags', 'searched', "starred"
    id: '57b574',
    order: {
      key,
      ascending,
    }
  }
  user: {
    id:'512178',
  },
}
```
