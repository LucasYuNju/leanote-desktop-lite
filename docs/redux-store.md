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
		generated: {
			searchResult: {
				[keyword]: []
			},
			latest: [],
		},
    notes: {
      20dr92: {
        noteId: '20dr92',
        title: 'wildlife',
      },
    }
    notebooks: {
      57b574: {
        title: 'Pictured Notebook'
        notebookId: '57b574',
        noteIds: [],
        subs: [],
      },
    },
    tags: {
      // derived
      TODO: {
        tag: 'TODO',
        noteIds,
      }
    },
  },
	edit: {
		20dr92(noteId) : 'edit',
		311sa0(noteId) : 'preview',
	}
	navigator: {
		current,
		length,
		path,
	},
  noteList: {
    order: {
      key,
      ascending,
    },
  },
  user: {
    email: '',
    id:'512178',
    logo: 'http://xxx.jpg',
    name: 'bot',
    localUsn: 1077,
    remoteUsn: 1077,
  },
}
```
