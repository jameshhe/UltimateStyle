import mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Create database scheme for notes
 */
const NoteScheme = new Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Note", NoteScheme);
