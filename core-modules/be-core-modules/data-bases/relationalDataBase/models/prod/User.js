var bcrypt = require('#helpers/bcrypt')

module.exports = function(sequelize, DataTypes) {
  var modelName = 'user'

  const User = sequelize.define(
    modelName,
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [4, 30]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {}
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 60]
        }
      }
    },
    {
      classMethods: {
        hooks: {
          afterValidate: generateHashedPassword
        }
      }
    }
  )

  User.associate = function(models) {
    var User = models[modelName]
    var Question = models.question

    User.hasMany(Question)
  }

  return User
}

function generateHashedPassword(user, options) {
  var password = user.password
  if (password) {
    user.password = bcrypt.hashSync(password)
  }
}
