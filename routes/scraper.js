// Dependencies
const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models");

const scraper = (spellName, cb) => {
  // Replaces any spaces with hyphens
  hyphenatedName = spellName.replace(/\s+/g, "-");

  axios.get("https://www.dnd-spells.com/spell/" + hyphenatedName).then((response) => {
    const $ = cheerio.load(response.data);
    const spellTitle = $(".page-content .row .col-md-12 h1").text();
    const classes = [];
    let level, casting_time, range, components, duration, description;

    $(".page-content .row .col-md-12 p").each((i, element) => {
      if (i === 1) {
        $(element).find("strong").each((j, strong) => {
          if (j === 0) {
            level = $(strong).text();
          }
          if (j === 1) {
            casting_time = $(strong).text();
          }
          if (j === 2) {
            range = $(strong).text();
          }
          if (j === 3) {
            components = $(strong).text();
          }
          if (j === 4) {
            duration = $(strong).text();
          }
        });
      }
      else if (i === 3) {
        description = $(element).text();
      }
      else if (i === 5) {
        $(element).find("a").each((k, a) => {
          classes.push($(a).text());
        });
      }
    });

    const spellObj = {
      spellTitle,
      classes,
      level,
      casting_time,
      range,
      components,
      duration,
      description
    };

    //db.Spell.create..
    console.log("spellObj:", spellObj);

  }).catch((err) => {
    console.log(err)
  });

};

scraper("toll the dead");
