// Creating CharacterSpells model
module.exports = function(sequelize, DataTypes) {
  var CharacterSpells = sequelize.define("CharacterSpells", {
    CharacterId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SpellId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return CharacterSpells;
};
