// Requires
var db = require("../models");
var passport = require("../config/passport");

module.exports = (app) => {
  // Login
  app.post("/api/user/login", passport.authenticate("local"), (req, res) => {
    res.json("/members");
  });

  // Signup
  app.post("/api/user/signup", (req, res) => {
    console.log(req.body);
    db.User.create(req.body).then(() => {
      res.redirect(307, "/api/user/login");
    }).catch(function(err) {
      console.log(err);
      // Error handling
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
  app.get("/api/user/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Getting user/character data
  app.get("/api/user/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {      
      // Otherwise send back the user's email and character info
      db.Characters.findAll({ userId: req.user.id }).then(response => {
        res.json({
          name: req.user.name,
          characterArr: response
        });
      });
    }
  });

  // Create character
  app.post("/api/character/create", (req, res) =>{
    db.Characters.create({
      ...req.body,
      userId: req.user.id
    }).then((response) => {
      res.json(response);
    }).catch((err) => {
      res.json(err);
    });
  });


};
