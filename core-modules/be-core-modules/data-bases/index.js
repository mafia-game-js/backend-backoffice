const RelationalDataBases = require('./relationalDataBase')

module.exports = new (class DataBase {
  constructor() {
    this.RelationalDataBases = RelationalDataBases
  }
})()
