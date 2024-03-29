// Dependencies
var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");

// Port
var PORT = process.env.PORT || 3001;
var db = require("./models");

// Express and middleware
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Sessions to track user login
app.use(session({ secret: "Taako Taaco", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/api-routes.js")(app);

// Database sync
db.sequelize.sync({ force: false }).then(function() {
  // db.User.create({
  //   name: "Ashley",
  //   email: "ash@ash.com",
  //   password: "asdf"
  // }).then(() => {
  //   db.Characters.create({
  //     userId: 1,
  //     characterName: "Victra au Bast",
  //     characterLevel: 6,
  //     characterRace: "Half Elf",
  //     characterClass: "Warlock"
  //  }).then(() => {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
//   });
// });