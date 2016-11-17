### route pattern:

```
notebooks/:notebookId/notes/:noteId/(note|markdown)
tags/:tagId/notes/:noteId/(note|markdown)
starred/:ignore/notes/:notesId/(note|markdown)
setting
```

### state shape

```
state = {
  entities: {
		generatedNoteLists: {
			byId: {
				searchResult: {
					noteIds: [],
				},
				latest: {
					noteIds: [],
				},
			}
		},
    notes: {
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
      byId: {
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
