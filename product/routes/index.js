const express = require('express')
const controllers = require('#ctrl')

const router = express.Router()

router
  .get(
    '/helloword',
    controllers.helloword
  )

module.exports = router
