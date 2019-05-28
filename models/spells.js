// Creating Spells model
module.exports = function(sequelize, DataTypes) {
  var Spells = sequelize.define("Spells", {
    editedName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    level: {
      type: DataTypes.INTEGER
    },
    duration: {
      type: DataTypes.STRING
    },
    school: {
      type: DataTypes.STRING
    },
    components: {
      type: DataTypes.STRING
    },
    range: {
      type: DataTypes.STRING
    },
    page: {
      type: DataTypes.STRING
    },
    concentration: {
      type: DataTypes.STRING
    },
    ritual: {
      type: DataTypes.STRING
    },
    class: {
      type: DataTypes.STRING
    },
    castingTime: {
      type: DataTypes.STRING
    }
  });
  return Spells;
};
