module.exports = function(sequelize, DataTypes) {
  var modelName = 'question'

  const Question = sequelize.define(modelName, {
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    range: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  Question.associate = function(models) {
    var Question = models[modelName]
    var User = models.user
    var Answer = models.answer

    Question.hasMany(Answer)

    Question.belongsTo(User)
  }

  return Question
}
