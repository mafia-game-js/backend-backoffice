const beCoreModules = require('./be-core-modules')
const relationalDataBaseConfig = require('../config/relational-database')

const prod = relationalDataBaseConfig.databases.prod[process.env.NODE_ENV]

if (prod.use_env_variable) prod.url = process.env.POSTGRESS_URL

module.exports.relationalDataBase = new beCoreModules.dataBase.RelationalDataBases({ prod })
