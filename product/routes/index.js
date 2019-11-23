const express = require('express')
const controllers = require('#productCtrl')

const router = express.Router()

router
  .get('/helloworld', controllers.helloworld.helloworld)
  .get('/question/list', controllers.question.list)
  .post('/question/nextQuestion', controllers.question.nextQuestion)

module.exports = router
