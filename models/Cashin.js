const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.js");  // Assuming a User model exists

const cashInSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
   // required: true,
  },
  source: {
    type: String,
    default: "",
   // required: true,
  },
  description: {
    type: String,
    default: "",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("CashIn", cashInSchema);