// Creating CharacterSpells model
module.exports = function(sequelize, DataTypes) {
  var CharacterSpells = sequelize.define("CharacterSpells", {
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spellId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return CharacterSpells;
};
