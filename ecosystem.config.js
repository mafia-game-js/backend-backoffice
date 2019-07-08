module.exports = {
  apps: [
    {
      name: 'backend-backoffice',
      script: './server.js',
      wait_ready: true,
      listen_timeout: 3000,
      kill_timeout: 3000,
      env: {
        BLUEBIRD_W_FORGOTTEN_RETURN: '0'
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
}
