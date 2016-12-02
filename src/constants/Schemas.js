import { Schema, arrayOf } from 'normalizr';

// Be careful for using defaults value! Object or array will be shared among multiple entities.
const notebookSchema = new Schema('notebooks', {
	idAttribute: 'notebookId',
	defaults: {
		subs: [],
		noteIds: [],
	}
});

const noteSchema = new Schema('notes', {
	idAttribute: 'noteId',
	defaults: {
		tags: [],
	}
});

// notebookSchema.define({
//   subs: arrayOf(notebookSchema),
// });

export {
  noteSchema,
  notebookSchema,
}
