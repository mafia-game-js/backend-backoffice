
module.exports = function (sequelize, DataTypes) {
  var modelName = 'settings'

  return sequelize.define(modelName, {
    time: {
      type: DataTypes.INTEGER
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    influence: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
      classMethods: {
      }
    })
}
