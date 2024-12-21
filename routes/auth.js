const express = require("express");
const passport = require("passport");
const User = require("../models/user");

const wrapAsync = require("../utils/wrapasync.js");
const { saveRedirectUrl, isLoggedIn } = require("../middleware");

const router = express.Router();

// Signup route
router.get("/login-register", (req, res) => {
  // Render the same page for both login and registration, and pass a flag to differentiate
  res.render("users/login-register.ejs");
});


router.post("/login-register", wrapAsync(async (req, res) => {
  const { action, username, email, password } = req.body; // 'action' will be used to distinguish between login and register forms

  if (action === "register") {
     try {
        // Handle registration
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
           if (err) return next(err);
           req.flash("success", "Welcome to Wanderlust!");
           res.redirect("/home");
        });
     } catch (err) {
        req.flash("error", err.message);
        res.render("users/login-register.ejs", { error: err.message, action: "register" }); // Pass 'action' to toggle registration form
     }
  } else {
     // Handle login
     passport.authenticate("local", {
        failureRedirect: "/login-register",
        failureFlash: true,
     })(req, res, () => {
        req.flash("success", "Welcome back to Wanderlust!");
        res.redirect("/home");
     });
  }
}));


// // Login route
// router.get("/login", (req, res) => {
//   res.render("users/login.ejs", { success: req.flash("success"), error: req.flash("error") });
// });

// router.post(
//   "/login",
//   saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   wrapAsync(async (req, res) => {
//     req.flash("success", "Welcome back to Wanderlust!");
//     let redirectUrl = res.locals.redirectUrl || "/home";
//     res.redirect(redirectUrl);
//   })
// );

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have logged out!");
    res.redirect("/home");
  });
});

module.exports = router;
