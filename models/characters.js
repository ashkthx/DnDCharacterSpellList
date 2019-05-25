// Creating Characters model
module.exports = function(sequelize, DataTypes) {
  var Characters = sequelize.define("Characters", {
    characterName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
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
