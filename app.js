const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const ejsMate = require("ejs-mate");

const User = require("./models/user");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");
const expenseRoutes = require("./routes/expense"); // Include expense routes
const homeRoutes = require("./routes/home");
//const cashinRoutes = require("./routes/cashin"); // Include cash-in routes



const app = express();

// Database Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/flowharbour")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Database connection error: ", err);
  });

// Middleware Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));



app.use(
  session({
    secret: "thisissecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  })
);
app.use(flash());

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash & Local Variables Middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", authRoutes);
app.use("/todos", todoRoutes);
app.use("/expenses", expenseRoutes); // Add expense routes
app.use("/home", homeRoutes);


// Catch-All for Undefined Routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error Handling
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("Error/error.ejs", { message });
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
