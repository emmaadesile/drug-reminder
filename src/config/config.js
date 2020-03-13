require('dotenv').config();

const {
  DB_NAME,
  DB_NAME_TEST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
  DB_URL_PROD
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    host: DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME_TEST,
    port: DB_PORT,
    host: DB_HOST,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: DB_URL_PROD
  }
};
