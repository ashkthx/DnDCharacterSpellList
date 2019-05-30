// Creating Spells model
module.exports = function(sequelize, DataTypes) {
  var Spells = sequelize.define("Spells", {
    editedName: {
      type: DataTypes.STRING,
      //allowNull: false
    },
    spellTitle: {
      type: DataTypes.STRING,
      //allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    level: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.STRING
    },
    components: {
      type: DataTypes.STRING
    },
    range: {
      type: DataTypes.STRING
    },
    classes: {
      type: DataTypes.STRING
    },
    casting_time: {
      type: DataTypes.STRING
    },
    higher_level: {
      type: DataTypes.TEXT
    }
  });
  return Spells;
};
