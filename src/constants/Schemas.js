import { Schema, arrayOf } from 'normalizr';

const notebookSchema = new Schema('notebooks', { idAttribute: 'NotebookId' });

const noteSchema = new Schema('notes', { idAttribute: 'NoteId' });

notebookSchema.define({
  Subs: arrayOf(notebookSchema),
});

export {
  noteSchema,
  notebookSchema,
}
