const { relationalDataBase } = require('#core')
var bcrypt = require('./helpers/bcrypt')

relationalDataBase.db.prod.user
  .create({
    name: 'Francisco',
    email: 'zurit92@gmail.com',
    password: bcrypt.hashSync('francisco'),
    role: 'superAdmin' // options: normal, superAdmin
  })
  .then(() => {})
  .catch(err => {
    console.log(err)
  })
