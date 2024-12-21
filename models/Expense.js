const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.js");  // Assuming a User model exists

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
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
  paymentMethod: {
    type: String,
    enum: ["Cash", "Credit", "Debit", "Other"],
    default: "Cash",
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Overdue"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Expense", expenseSchema);