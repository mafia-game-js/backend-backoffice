const { exec } = require('child_process')
const moment = require('moment')
const { version } = require('./package.json')

exec(`git archive -o auth.${moment().format('YYYYMMDDHHmmss')}.${version}.zip HEAD`)
