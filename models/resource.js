const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Assuming you want to relate this schema to a User model, even though it's not currently used here
const User = require("./user.js");

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Title is required
    trim: true,      // Trim whitespace from title
  },
  description: {
    type: String,
    required: false, // Description is optional
    trim: true,      // Trim whitespace from description
  },
  url: {
    type: String,
    required: false,  // URL is optional
    match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i, // Basic URL validation
  },
  category: {
    type: String,
    required: true,   // Category is required
    enum: ['work', 'personal', 'urgent', 'games', 'travel', 'sports', 'other'], // Optional: predefined categories
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,  // Automatically create createdAt and updatedAt fields
});

module.exports = mongoose.model("Resource", resourceSchema);