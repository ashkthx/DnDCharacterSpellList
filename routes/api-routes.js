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

  // Is user logged in
  app.get("/api/user/is_logged_in", (req, res) => {
    if (req.user) {
      res.send(true);
    }
    else {
      res.send(false);
    };
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

  // Get character data from db
  app.get("/api/character/data/:characterId", (req, res) =>{
    if (!req.user) {
      return res.json({ status: false });
    } 
    else {
      db.Characters.findOne({
        id: req.params.characterId
      }).then(response => {
        if(response.userId !== req.user.id) {
          return res.json({ status: false });
        }
        else {
          const { characterName, characterLevel, characterRace, characterClass } = response;
          res.json({
            characterName, 
            characterLevel, 
            characterRace, 
            characterClass,
            status: true
          });
        }
      });
    }
  });

  // Add spell
  app.post("/api/spell/add", (req, res) => {
    // Make string lowercase and remove special characters
    const editedSpellName = req.body.spellName.toLowerCase().replace(/[^\w\s]/gi, "");
    db.Spells.findOne({ editedName: editedSpellName }).then(spellsResponse => {
      console.log(editedSpellName);
      // If we don't find anything we need to scrape the website
      // Update the CharacterSpells table with the new association
      db.CharacterSpells.findAll({ characterId: req.body.characterId }).then(spellsArr => {
        res.json(spellsArr);
      });
    });
  });

};
