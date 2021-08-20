import mongoose from "mongoose";
import note from "../models/notebookModel.js";

export const getNote = (req, res, next) => {
  note.findById(req.params.noteId, (err, note) => {
    if (err) {
      res.send(err);
    }

    res.json(note);
  });
};

export const getAllNotes = (req, res, next) => {
  note.find({}, (err, notes) => {
    if (err) {
      res.send(err);
    }

    res.json(notes);
  });
};

export const createNote = (req, res, next) => {
  const newNote = new note(req.body);

  newNote.save((err, note) => {
    if (err) {
      res.send(err);
    }

    res.json(note);
  });
};

export const updateNote = (req, res, next) => {
  note.findOneAndUpdate(
    {
      _id: req.params.noteId,
    },
    req.body,
    (err, note) => {
      if (err) {
        res.send(err);
      }

      res.json(note);
    }
  );
};

export const deleteNote = (req, res, next) => {
  note.remove(
    {
      _id: req.params.noteId,
    },
    (err) => {
      if (err) {
        res.send(err);
      }

      res.json({
        message: `note ${req.params.noteId} successfully deleted`,
      });
    }
  );
};
