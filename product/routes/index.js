const express = require('express')
const controllers = require('#productCtrl')
const router = express.Router()

router
  .get(
    '/helloworld',
    controllers.helloworld.helloworld
  )

module.exports = router
