const express = require("express");
const router = express.Router();
const Note = require("../models/note");

// GET Notes Page
router.get("/", async (req, res, next) => {
  try {
    const notes = await Note.find(); // Fetch notes from the database
    console.log(notes);
    res.render("Notes/index.ejs", { notes }); // Pass notes to the view
  } catch (err) {
    next(err);
  }
});

// POST New Note
router.post("/", async (req, res, next) => {
  const {content} = req.body;
  console.log(content);
  const newNote = new Note({
    content,
  })
  await newNote.save();
  res.redirect("/notes");
});

// DELETE Note
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id); // Delete note by ID
    req.flash("success", "Note deleted successfully!");
    res.redirect("/notes");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
