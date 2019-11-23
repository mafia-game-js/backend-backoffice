module.exports = function(sequelize, DataTypes) {
  var modelName = 'answer'

  const Answer = sequelize.define(modelName, {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER
    },
    questionRelated: {
      type: DataTypes.INTEGER
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    influence: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  return Answer
}
