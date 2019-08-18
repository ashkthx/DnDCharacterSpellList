// Dependencies
const cheerio = require("cheerio");
const axios = require("axios");

const scraper = (editedName, cb) => {
  // Replaces any spaces with hyphens
  hyphenatedName = editedName.replace(/\s+/g, "-").replace("/", "");


  axios.get("https://www.dnd-spells.com/spell/" + hyphenatedName).then((response) => {
    const $ = cheerio.load(response.data);
    const spellTitle = $(".page-content .row .col-md-12 h1").text();
    if (!editedName.includes("-ritual") && spellTitle === "") {
      return scraper(editedName + "-ritual", cb);
    }
    let classes = [];
    let level, casting_time, range, components, duration, description, higher_level;

    let classIndex;
    if ($("h4.classic-title").text()) {
      classIndex = 6;
    }
    else {
      classIndex = 5;
    }

    $(".page-content .row .col-md-12 p").each((i, element) => {
      if (i === 1) {
        $(element).find("strong").each((j, strong) => {
          if (j === 0) {
            level = $(strong).text().trim();
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
        description = $(element).text().trim();
      }
      else if (classIndex === 6 && i === 4) {
        higher_level = $(element).text().trim();
      }
      else if (i === classIndex) {
        $(element).find("a").each((k, a) => {
          classes.push($(a).text());
        });
      }
    });

    // Stores the classes joined by commas instead of an array
    classes = classes.join(", ");

    const spellObj = {
      spellTitle,
      classes,
      level,
      casting_time,
      range,
      components,
      duration,
      description,
      higher_level
    };

    // console.log("spellObj:", spellObj);
    return cb(spellObj);

  }).catch((err) => {
    console.log(err)
  });

};

module.exports = scraper;
