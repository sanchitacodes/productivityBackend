const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  completed: { type: Boolean, default: false },  // Show/hide functionality
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }  // Associate flashcard with user
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
