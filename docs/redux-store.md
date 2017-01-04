### route pattern:

pattern: `/edit/:noteStackType-:noteStackId/:noteId`

examples:
- `/edit/notebook-8qt4/s12oi9`
- `/edit/tag-web/s12oi9`
- `/edit/search-英语/j2os89`

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
        title: 'Pictured Notebook',
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
    // shiftSelect & ctrlSelect
    checked: [],
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
