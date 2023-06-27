// See: https://sequelize.org/docs/v6/other-topics/migrations/#the-sequelizerc-file
// See: https://sequelize.org/docs/v6/other-topics/migrations/#dynamic-configuration

require('dotenv').config()

module.exports = {
    development: {
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dialect: 'postgres',
      port: process.env.DB_PORT,
    },
    production: {
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dialect: 'postgres',
      port: process.env.DB_PORT,
      },
    test: {
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dialect: 'postgres',
      port: process.env.DB_PORT,
      }
  };
