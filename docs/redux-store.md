
```
state = {
  entities: {
    notes: {
      searchedIds: [],
      starredIds: [],
      byId: {
        20dr92: {
            NoteId: '20dr92',
            Title: 'wildlife',
        },          
      }
    }
    notebooks: {
      rootIds: [],
      byId: {
          57b574: {
            Title: 'Pictured Notebook'
            NotebookId: '57b574',
            NoteIds: [],
            Subs: [],
          },          
      }
    },
    tags: {
      // Leanote does not provide api to get note with a certain tag.    
      byId: {
          1ys0a1: {
            tagId: 1ys001,
            Tag: 'TODO',
            NoteIds,
          }          
      },
      byName: {
          TODO: '1ys0a1',
      }
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
