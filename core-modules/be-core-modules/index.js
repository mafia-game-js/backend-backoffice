const dataBase = require('./data-bases')
module.exports = new (class MasterModule {
  constructor() {
    this.dataBase = dataBase
  }
})()
