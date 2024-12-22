const express = require("express");
const Resource = require("../models/resource.js");  // Correct model import
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn } = require("../middleware");

const router = express.Router();
const cors = require('cors');

// Endpoint to render the homepage (resource library) - Show resources related to the logged-in user
router.get('/', isLoggedIn, wrapAsync(async (req, res) => {
  const userId = req.user._id;  // Get the logged-in user's ID from `req.user`
  const categories = await Resource.distinct('category', { createdBy: userId });
  const resources = await Resource.find({ createdBy: userId });  // Fetch all resources for the user
  res.render('Resource-Library/resource', { categories, resources });
}));

// Endpoint to get resources by category for a specific user
router.get('/category/:category', isLoggedIn, wrapAsync(async (req, res) => {
  const category = req.params.category;
  const userId = req.user._id;  // Get the logged-in user's ID from `req.user`
  const resources = await Resource.find({ category, createdBy: userId });
  res.render('Resource-Library/category', { category, resources });
}));

// Endpoint to add a resource (only for logged-in users)
router.post('/add-resource', isLoggedIn, wrapAsync(async (req, res) => {
    const { title, description, url, category } = req.body;
    const userId = req.user._id;  // Get the logged-in user's ID from `req.user`
  
    // Create a new resource and associate it with the logged-in user
    const newResource = new Resource({
      title,
      description,
      url,
      category,
      createdBy: userId  // Link the resource to the logged-in user
    });
  
    await newResource.save();  // Save the new resource to the database
    req.flash("success", "Resource added successfully!");  // Flash success message
    res.redirect('/resource');  // Redirect to the homepage (or the resource library page)
  }));
  

// router.post('/', isLoggedIn, wrapAsync(async (req, res) => {
//   const { title, description, url, category } = req.body;
//   const userId = req.user._id;  // Get the logged-in user's ID from `req.user`

//   // Create and save the new resource with the user's ID
//   const newResource = new Resource({
//     title,
//     description,
//     url,
//     category,
//     createdBy: userId  // Link the resource to the user
//   });

//   await newResource.save();
//   req.flash("success", "Resource added successfully!");  // Flash success message
//   res.redirect('/resources');
// }));

// // Endpoint to update a resource (e.g., editing the title, description, etc.)
// router.get('/edit/:id', isLoggedIn, wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   const resource = await Resource.findById(id);

//   if (!resource || resource.createdBy.toString() !== req.user._id.toString()) {
//     req.flash("error", "You don't have permission to edit this resource!");
//     return res.redirect('/resources');
//   }

//   res.render('Resource-Library/edit', { resource });
// }));

// router.put('/:id', isLoggedIn, wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   const { title, description, url, category } = req.body;
//   const resource = await Resource.findById(id);

//   if (!resource || resource.createdBy.toString() !== req.user._id.toString()) {
//     req.flash("error", "You don't have permission to update this resource!");
//     return res.redirect('/resources');
//   }

//   // Update the resource
//   resource.title = title;
//   resource.description = description;
//   resource.url = url;
//   resource.category = category;
//   await resource.save();

//   req.flash("success", "Resource updated successfully!");
//   res.redirect('/resources');
// }));

// // Endpoint to delete a resource
// router.delete('/:id', isLoggedIn, wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   const resource = await Resource.findById(id);

//   if (!resource || resource.createdBy.toString() !== req.user._id.toString()) {
//     req.flash("error", "You don't have permission to delete this resource!");
//     return res.redirect('/resources');
//   }

//   // Delete the resource
//   await Resource.findByIdAndDelete(id);
//   req.flash("success", "Resource deleted!");
//   res.redirect('/resources');
// }));

module.exports = router;  // Export the router for use in app.js
