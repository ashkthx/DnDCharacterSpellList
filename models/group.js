// Creating Groups model
module.exports = function(sequelize, DataTypes) {
  var Groups = sequelize.define("Groups", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Groups;
};
