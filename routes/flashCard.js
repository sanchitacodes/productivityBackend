const express = require("express");
const router = express.Router();
const Flashcard = require("../models/flashcard");
const wrapasync = require("../utils/wrapasync");
const { isLoggedIn } = require("../middleware");

// Get all flashcards
router.get("/",isLoggedIn ,wrapasync(async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ createdBy: req.user._id });
    res.render("flashcards/index", { title: "Flashcards", flashcards });
  } catch (err) {
    res.status(500).send("Error retrieving flashcards.");
  }
}));

// Render form to create a new flashcard
router.get("/new", (req, res) => {
  res.render("flashcards/new", { title: "Create Flashcard" });
});

// Create a new flashcard
router.post("/new",isLoggedIn ,wrapasync(async (req, res) => {
  const { question, answer } = req.body;
  try {
    const flashcard = new Flashcard({ 
      question, 
      answer, 
      createdBy: req.user._id 
    });
    await flashcard.save();
    res.redirect("/flashcard");
  } catch (err) {
    res.status(400).send("Error creating flashcard.");
  }
}));

// Show details of a flashcard
// router.get("/:id", async (req, res) => {
//   try {
//     const flashcard = await Flashcard.findById(req.params.id);
//     if (flashcard && flashcard.createdBy.equals(req.user._id)) {
//       res.render("show", { title: "Flashcard Details", flashcard });
//     } else {
//       res.status(404).send("Flashcard not found.");
//     }
//   } catch (err) {
//     res.status(500).send("Error retrieving flashcard.");
//   }
// });

// Render edit form for a flashcard
router.get("/edit/:id", async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (flashcard && flashcard.createdBy.equals(req.user._id)) {
      res.render("flashcards/edit", { title: "Edit Flashcard", flashcard });
    } else {
      res.status(404).send("Flashcard not found.");
    }
  } catch (err) {
    res.status(500).send("Error retrieving flashcard for editing.");
  }
});

// Update a flashcard
router.post("/edit/:id", async (req, res) => {
  const { question, answer } = req.body;
  try {
    const flashcard = await Flashcard.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { question, answer },
      { new: true }
    );
    if (flashcard) {
      res.redirect("/flashcard");
    } else {
      res.status(404).send("Flashcard not found.");
    }
  } catch (err) {
    res.status(500).send("Error updating flashcard.");
  }
});

// Delete a flashcard
router.post("/delete/:id", async (req, res) => {
  try {
    const flashcard = await Flashcard.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    if (flashcard) {
      res.redirect("/flashcard");
    } else {
      res.status(404).send("Flashcard not found.");
    }
  } catch (err) {
    res.status(500).send("Error deleting flashcard.");
  }
});

module.exports = router;
