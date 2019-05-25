// Requires
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Login
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/members");
  });

  // Signup
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      const errMessage = err.errors[0].message;
      let newMessage;
      if (errMessage[0] === "V") {
        newMessage = "Please enter a valid email address"
      } else {
      newMessage = errMessage.slice(0,1).toUpperCase() + errMessage.slice(1); 
      }
      res.status(422).json(newMessage);
    });
  });

  // Logout
  app.get("/api/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Getting user data
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      res.json({
        name: req.user.name,
        id: req.user.id
      });
    }
  });
};
