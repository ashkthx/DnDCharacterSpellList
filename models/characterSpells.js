// Creating CharacterSpells model
module.exports = function(sequelize, DataTypes) {
  var CharacterSpells = sequelize.define("CharacterSpells", {
    CharacterId: {
      type: DataTypes.INTEGERS,
      allowNull: false
    },
    SpellId: {
      type: DataTypes.INTEGERS,
      allowNull: false
    }
  });
};
