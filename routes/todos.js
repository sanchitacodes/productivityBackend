const express = require("express");
const Todo = require("../models/todo");
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn } = require("../middleware");

const router = express.Router();

// Display todos
router.get("/", isLoggedIn, wrapAsync(async (req, res) => {
  const todos = await Todo.find({ createdBy: req.user._id });
  res.render("todos/index.ejs", { todos });
}));

// Add new todo
router.get("/new", isLoggedIn, (req, res) => {
  res.render("todos/new.ejs");
});

router.post("/", isLoggedIn, wrapAsync(async (req, res) => {
  const { task } = req.body;
  const newTodo = new Todo({
    task,
    createdBy: req.user._id,
  });
  await newTodo.save();
  req.flash("success", "Task added successfully!");
  res.redirect("/todos");
}));

// Update Todo status (mark as complete or incomplete)
router.put("/:id", isLoggedIn, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  todo.completed = !todo.completed;  // Toggle the completed status
  await todo.save();
  res.redirect("/todos");
}));



// Delete todo
router.delete("/:id", isLoggedIn, wrapAsync(async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  req.flash("success", "Task deleted!");
  res.redirect("/todos");
}));

module.exports = router;
