const Sequelize = require('sequelize');
const { name } = require('../package.json');
require('dotenv').config()
// Initialize database with Sequelize


const db = new Sequelize( process.env.DATABASE_URL,
  {
    dialet: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        sslmode: 'require',
        rejectUnauthorized: false
      }
    }
  }
);



module.exports = db;
