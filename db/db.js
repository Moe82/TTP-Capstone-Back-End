const Sequelize = require('sequelize');
const { name } = require('../package.json');
require('dotenv').config()
// Initialize database with Sequelize


const db = new Sequelize( process.env.DATABASE_URL,
  {
    development: {
      url: 'DATABASE_URL',
      dialect: 'postgres',
      dialectOptions: {
          ssl: {
              require: true,
              rejectUnauthorized: false
          }
      }     
    }
  }
);




module.exports = db;
