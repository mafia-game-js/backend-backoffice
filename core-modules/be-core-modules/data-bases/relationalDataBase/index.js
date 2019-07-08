const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const basename = path.basename(module.filename)

module.exports = class RelationalDataBase {
  constructor(relationalConfig) {
    this.relationalConfig = relationalConfig
    this.db = {}
    this.initDatabases()
  }

  initDatabases() {
    const config = this.relationalConfig
    const databases = Object.keys(config)

    databases.forEach(database => {
      const dbObject = config[database]
      let sequelize
      if (dbObject.url) {
        sequelize = new Sequelize(dbObject.url, {
          logging: dbObject.logging || false
        })
      } else {
        sequelize = new Sequelize(dbObject.database, dbObject.username, dbObject.password, dbObject)
      }

      fs.readdirSync(__dirname + `/models/${database}`)
        .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
        .forEach(file => {
          const model = sequelize.import(path.join(__dirname + `/models/${database}`, file))
          if (!this.db[database]) this.db[database] = {}
          this.db[database][model.name] = model
        })

      Object.keys(this.db[database]).forEach(modelName => {
        if (this.db[database][modelName].associate) {
          this.db[database][modelName].associate(this.db[database])
        }
      })
      this.db[database].sequelize = sequelize
      this.db[database].sequelize.sync()
    })
    this.db.Sequelize = Sequelize
  }
}
