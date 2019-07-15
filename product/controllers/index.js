const express = require('express')
const controllers = require('#ctrl')
const router = express.Router()

module.exports = {
  helloworld: require('./helloworld.js')
}
