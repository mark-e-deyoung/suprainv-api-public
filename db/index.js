const { Sequelize } = require('sequelize');

// make sure we get DB_* settings from .env
require('dotenv').config();

// might need to add DB_PORT on deployment
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);

//synchronizes models to database (w/o need for migration)
//sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;