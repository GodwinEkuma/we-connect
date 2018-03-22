require('dotenv').config();

const config = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DEV_NAME,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: '',
    database: 'test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
};

module.exports = config;
