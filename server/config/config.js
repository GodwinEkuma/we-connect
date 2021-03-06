require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DEV_NAME,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'weconnect_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  localtest: {
    username: 'postgres',
    password: 'postgres',
    database: 'weconnect_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  }
};

