#!/usr/bin/env node
require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const parser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const { relationalDataBase } = require('#core')

class App {
  constructor() {
    this.app = express()
    this.dbDrivers = {}
    this.config()
    this.logs()
    this.routes()
    this.initServer()
  }

  config() {
    this.app.use(cors())
    this.app.use(parser.json()).use(
      parser.urlencoded({
        extended: false
      })
    )
  }

  logs() {
    this.app.use(logger('dev'))
  }

  routes() {
    this.app.use(function(req, res, next) {
      req.models = relationalDataBase.db.prod
      req.Sequelize = relationalDataBase.db.Sequelize
      req.sequelize = relationalDataBase.db.prod.sequelize
      next()
    })
    this.app.use('/admin', routes)
  }

  async initServer() {
    try {
      await relationalDataBase.db.prod.sequelize.sync()
      console.log('RDS Database of prod set up succeded...')
      this.app.listen(process.env.PORT, () => {
        console.log(`Server listening on port: ${process.env.PORT}`)
      })
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  }
}

new App()
