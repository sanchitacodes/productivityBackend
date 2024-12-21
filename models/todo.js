const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.js");


const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
