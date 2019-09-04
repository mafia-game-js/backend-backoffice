var _ = require('underscore')
var jwt = require('jsonwebtoken')
var bcrypt = require('#helpers/bcrypt')

class User {
  login(req, res) {
    const db = req.models
    const email = req.body.email
    const password = req.body.password

    db.user
      .findOne({
        where: {
          email
        }
      })
      .then(function(user) {
        if (_.isEmpty(user)) {
          res.status(400).json({ code: 'user_dont_exist' })
          return
        }

        let hashedPass = user.password
        if (bcrypt.compare(hashedPass, password)) {
          var myToken = jwt.sign(
            {
              email: email,
              role: user.role,
              id: user.id
            },
            process.env.SECRET_KEY,
            {
              expiresIn: '30 days'
            }
          )

          res.status(200).json({
            user: user.name,
            token: myToken
          })
        } else {
          res.status(400).json({ code: 'wrong_password' })
        }
      })
  }
  isAuth(req, res) {
    if (!req.headers.authorization) {
      return res.status(200).json({ status: false })
    }
    var token = req.headers.authorization
    var payload = jwt.decode(token, process.env.SECRET_KEY)
    if (payload.exp * 1000 <= new Date().getTime()) {
      return res.status(200).json({ status: false })
    }

    if (payload.role === 'superAdmin') {
      return res.status(200).json({ status: 2 })
    }

    res.status(200).json({ status: true })
  }
  isAuthMiddleware(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(403).json({ code: 'auth_header_empty' })
    }
    var token = req.headers.authorization
    var payload = jwt.decode(token, process.env.SECRET_KEY)
    if (payload.exp <= new Date().getTime() / 1000) {
      return res.status(401).json({ code: 'expired_token' })
    } else {
      req.user = payload
      next()
    }
  }
  ensureIsAdminMiddleware(req, res, next) {
    if (req.user.role !== 'superAdmin') {
      return res.status(403).send({ message: 'No eres administrador' })
    }
    next()
  }
}

module.exports = new User()
