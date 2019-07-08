const RelationalDataBase = require('./index')

describe('Instanciate BBDD', () => {
  test('Creates a BBDD for just the current data base', async () => {
    const db = new RelationalDataBase({
      prod: {
        username: 'postgres',
        password: 'postgres',
        database: 'URbackoffice_test',
        host: 'localhost',
        dialect: 'postgres',
        port: '5433',
        logging: false
      }
    }).db

    expect(db.prod).toBeTruthy()
  })
})
