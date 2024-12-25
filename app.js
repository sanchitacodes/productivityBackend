const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");

const User = require("./models/user");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");
const expenseRoutes = require("./routes/expense");
const homeRoutes = require("./routes/home");
const resourceRouter = require("./routes/resource_server");
// const notesRoutes = require("./routes/notes");

const app = express();

// Database Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/flowharbour")
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("Database connection error: ", err));

// Middleware Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "thisissecret",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);
app.use(flash());

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash Messages Middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/home", homeRoutes);
app.use("/todos", todoRoutes);
app.use("/resource", resourceRouter);
// app.use("/notes", notesRoutes);

// Static Study Page
app.get("/study", (req, res) => {
  res.render("Study/study.ejs");
});
app.use('/Notes', express.static(path.join(__dirname, 'Notes')))

// FlowHarbour Health Route
app.use('/flowharbour-health', express.static(path.join(__dirname, 'flowharbour-health')));

// Catch-All for Undefined Routes
app.all("*", (req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).render("Error/error.ejs", { message });
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
