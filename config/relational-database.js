require('dotenv').config()

module.exports = {
  databases: {
    prod: {
      test: {
        username: 'postgres',
        password: 'postgres',
        database: 'bd_test',
        host: 'localhost',
        dialect: 'mysql',
        port: '5433',
        logging: false
      },
      development: {
        use_env_variable: 'POSTGRESS_URL',
        logging: false,
        dialect: 'mysql'
      },
      qa: {
        use_env_variable: 'POSTGRESS_URL',
        dialect: 'mysql'
      },
      staging: {
        use_env_variable: 'POSTGRESS_URL',
        dialect: 'mysql'
      },
      production: {
        use_env_variable: 'POSTGRESS_URL',
        dialect: 'mysql'
      }
    }
  },
  prod: {
    use_env_variable: 'POSTGRESS_URL',
    logging: false,
    dialect: 'mysql'
  }
}
