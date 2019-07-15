const express = require('express')
const controllers = require('#ctrl')

const router = express.Router()

router
  .post('/login', controllers.user.login)
  .get('/isAuth', controllers.user.isAuth)
  .get('/setting/get', controllers.gamesetting.get)
  .post(
    '/setting/update',
    controllers.user.isAuthMiddleware,
    controllers.user.ensureIsAdminMiddleware,
    controllers.gamesetting.update
  )
  .get(
    '/question/list',
    controllers.user.isAuthMiddleware,
    controllers.user.ensureIsAdminMiddleware,
    controllers.question.list
  )
  .post(
    '/question/create',
    controllers.user.isAuthMiddleware,
    controllers.user.ensureIsAdminMiddleware,
    controllers.question.create
  )
  .post(
    '/question/update',
    controllers.user.isAuthMiddleware,
    controllers.user.ensureIsAdminMiddleware,
    controllers.question.update
  )
  .post(
    '/question/delete',
    controllers.user.isAuthMiddleware,
    controllers.user.ensureIsAdminMiddleware,
    controllers.question.delete
  )
  .post(
    '/uploadPhoto',
    controllers.user.isAuthMiddleware,
    controllers.user.ensureIsAdminMiddleware,
    controllers.files.uploadPhoto
  )
  .post(
    '/answer/update',
    controllers.user.isAuthMiddleware,
    controllers.user.ensureIsAdminMiddleware,
    controllers.question.updateAnswer
  )
  .post(
    '/answer/create',
    controllers.user.isAuthMiddleware,
    controllers.user.ensureIsAdminMiddleware,
    controllers.question.createAnswer
  )
  .post(
    '/answer/delete',
    controllers.user.isAuthMiddleware,
    controllers.user.ensureIsAdminMiddleware,
    controllers.question.deleteAnswer
  )

module.exports = router
