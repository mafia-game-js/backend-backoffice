var crypto = require('crypto')

var SaltLength = 12

function createHash (password) {
  var salt = generateSalt(SaltLength)
  var hash = md5(password + salt)
  return salt + hash
}

function validateHash (hash, password) {
  var salt = hash.substr(0, SaltLength)
  var validHash = salt + md5(password + salt)
  return hash === validHash
}

function generateSalt (len) {
  let set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ'
  let setLen = set.length
  let salt = ''
  for (var i = 0; i < len; i++) {
    var p = Math.floor(Math.random() * setLen)
    salt += set[p]
  }
  return salt
}

function md5 (string) {
  return crypto.createHash('md5').update(string).digest('hex')
}

module.exports = {
  'hashSync': createHash,
  'compare': validateHash
}
