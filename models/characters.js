// Creating Characters model
module.exports = function(sequelize, DataTypes) {
  var Characters = sequelize.define("Characters", {
    characterName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    characterClass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    characterRace: {
      type: DataTypes.STRING,
      allowNull: false
    },
    characterLevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      // allowNull: false
    }
  });
  return Characters;
};
