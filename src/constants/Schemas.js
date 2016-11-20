import { Schema, arrayOf } from 'normalizr';

const notebookSchema = new Schema('notebooks', { idAttribute: 'notebookId', defaults: { noteIds: [] } });

const noteSchema = new Schema('notes', { idAttribute: 'noteId' });

notebookSchema.define({
  subs: arrayOf(notebookSchema),
});

export {
  noteSchema,
  notebookSchema,
}
