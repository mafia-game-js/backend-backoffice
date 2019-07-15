const images = require('../helpers/images.js')

class Files {
  uploadPhoto (req, res) {
    var type = 'profile'
    var idName = req.user.id
    var imageFileResizeHeight = 200
    images.upPhoto(req, idName, type, imageFileResizeHeight).then(function (data) {
      res.json({ status: data })
    })
  }
}

module.exports = new Files()
