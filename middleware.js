// const ExpressError = require("./utils/ExpressError.js");
// const Todo = require("./models/todo");
// const {userSchema} = require("./schema");

// module.exports.isLoggedIn = (req, res, next) => {
   
//     if (!req.isAuthenticated()) {
        
//         req.session.redirectUrl = req.originalUrl;

//         req.flash("error", "You must be signed in first!");
//         return res.redirect("/login");
//     }
//     next();
// }
// module.exports.saveRedirectUrl = (req, res, next) => {
//     if(req.session.redirectUrl){
//         res.locals.redirectUrl = req.session.redirectUrl;
//     }
//     next();
// }

// module.exports.isOwner = (req, res, next) => {
//     const { id } = req.params;
//     if (!req.user._id.equals(id)) {
//         req.flash("error", "You do not have permission to do that!");
//         return res.redirect(`/todos/${id}`);
//     }
//     next();
// }

// module.exports.validatingUser = (req, res, next) => {
//     let {error} = userSchema.validate(req.body);
//     if (error) {
//         let errMsg = error.details.map(el => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else{
//     next();
//     }
// }


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash("error", "You must be logged in!");
      return res.redirect("/login-register");
    }
    console.log("Logged-in User:", req.user);
    next();
  };
  
 // Middleware to save the URL user attempted to visit
module.exports.saveRedirectUrl=(req, res, next) =>{
  if (req.originalUrl !== "/login-register" ) {
    req.session.redirectUrl = req.originalUrl;  // Save URL in session
  }
  next();  // Proceed to the next middleware (passport authentication)
}

  
  