// Requires
const db = require("../models");
const passport = require("../config/passport");
const scraper = require("./scraper");

module.exports = (app) => {
  // Login
  app.post("/api/user/login", passport.authenticate("local"), (req, res) => {
    res.json("/members");
  });

  // Signup
  app.post("/api/user/signup", (req, res) => {
    db.User.create(req.body).then(() => {
      res.redirect(307, "/api/user/login");
    }).catch((err) => {
      console.log(err);
      // Error handling
      const errMessage = err.errors[0].message;
      let newMessage;
      if (errMessage[0] === "V") {
        newMessage = "Please enter a valid email address"
      } else {
        newMessage = errMessage.slice(0, 1).toUpperCase() + errMessage.slice(1);
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
      db.Characters.findAll({
        where: {
          userId: req.user.id
        }
      }).then(response => {
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
  app.post("/api/character/create", (req, res) => {
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
  app.get("/api/character/data/:characterId", (req, res) => {
    if (!req.user) {
      return res.json({ status: false });
    }
    else {
      db.Characters.findOne({
        where: {
          id: req.params.characterId
        }
      }).then(characterResponse => {
        if (characterResponse.userId !== req.user.id) {
          return res.json({ status: false });
        }
        else {
          db.CharacterSpells.findAll({
            where: {
              characterId: req.params.characterId
            }
          }).then(spellData => {
            const spellIdArr = spellData.map((element) => element.spellId);
            db.Spells.findAll({
              where: {
                id: { $in: spellIdArr }
              }
            }).then((spellsArr) => {
              const { characterName } = characterResponse;
              res.json({
                characterName,
                status: true,
                spellsArr
              });
            });
          });
        }
      });
    }
  });

  // Delete character
  app.post("/api/character/delete", (req, res) => {
    db.Characters.destroy({
      where: {
        id: req.body.characterId
      }
    }).then(() => {
      db.CharacterSpells.destroy({
        where: req.body
      }).then(() => {
        db.Characters.findAll({
          where: {
            userId: req.user.id
          }
        }).then((dbResponse) => {
          res.json(dbResponse);
        });
      });
    });
  });

  // Add spell
  app.post("/api/spell/add", (req, res) => {
    // Make string lowercase and remove special characters
    const editedSpellName = req.body.spellName.toLowerCase().replace(/[^\w\s]/gi, "");
    db.Spells.findOne({
      where: {
        editedName: editedSpellName
      }
    }).then(spellsResponse => {
      if (!spellsResponse) {
        scraper(editedSpellName, (spellObj) => {
          db.Spells.create(spellObj).then((newSpell) => {
            db.CharacterSpells.create({
              characterId: req.body.characterId,
              spellId: newSpell.id
            }).then(() => {
              db.CharacterSpells.findAll({
                where: {
                  characterId: req.body.characterId
                }
              }).then(spellsArr => {
                const spellIdArr = spellsArr.map((element) => element.spellId);
                db.Spells.findAll({
                  where: {
                    id: { $in: spellIdArr }
                  }
                }).then((spellData) => {
                  res.json(spellData);
                });
              });
            });
          });
        });
      }
      else {
        db.CharacterSpells.create({
          characterId: req.body.characterId,
          spellId: spellsResponse.id
        }).then(() => {
          db.CharacterSpells.findAll({
            where: {
              characterId: req.body.characterId
            }
          }).then(spellsArr => {
            const spellIdArr = spellsArr.map((element) => element.spellId);
            db.Spells.findAll({
              where: {
                id: { $in: spellIdArr }
              }
            }).then((spellData) => {
              res.json(spellData);
            });
          });
        });
      }
    });
  });

  // Delete
  app.post("/api/spell/delete", (req, res) => {
    db.CharacterSpells.destroy({
      where: req.body
    }).then(() => {
      db.CharacterSpells.findAll({
        where: {
          characterId: req.body.characterId
        }
      }).then(spellsArr => {
        const spellIdArr = spellsArr.map((element) => element.spellId);
        db.Spells.findAll({
          where: {
            id: { $in: spellIdArr }
          }
        }).then((spellData) => {
          res.json(spellData);
        });
      });
    });
  });

  // Search single spell from homepage
  app.post("/api/spell/single", (req, res) => {
    // Make string lowercase and remove special characters
    const editedSpellName = req.body.spellName.toLowerCase().replace(/[^\w\s]/gi, "");
    db.Spells.findOne({
      where: {
        editedName: editedSpellName
      }
    }).then(spellsResponse => {
      if (!spellsResponse) {
        scraper(editedSpellName, (spellObj) => {
          db.Spells.create(spellObj).then((newSpell) => {
            res.json(newSpell);
          });
        });
      }
      else {
        res.json(spellsResponse);
      }
    });
  });

};
