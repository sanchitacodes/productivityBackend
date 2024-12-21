const express = require("express");
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  // Render the home page
  res.render("home.ejs");
});

module.exports = router;
