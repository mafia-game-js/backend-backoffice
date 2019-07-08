const { exec } = require('child_process')

exec(
  './node_modules/.bin/sequelize --options-path ./config/.sequelize-prod --env prod db:migrate',
  { env: process.env },
  (err, stdout, stderr) => {
    if (err) {
      console.log('Migration failed. Error:', err.message)
      process.exit(1)
    } else {
      console.log('Migration successful in: ', process.env.NODE_ENV)
      process.exit(0)
    }
  }
)
