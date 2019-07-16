const express = require('express')
const controllers = require('#productCtrl')
const router = express.Router()

router
  .get(
    '/helloword',
    controllers.helloworld
  )

module.exports = router
