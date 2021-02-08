const Sequelize = require('sequelize');
const { name } = require('../package.json');
require('dotenv').config()
// Initialize database with Sequelize


const db = new Sequelize( process.env.DATABASE_URL || `postgres://postgres:${process.env.DB_PASS}@localhost:5432/${name}` ,
  {
    dialet: 'postgres',
    protocol: 'postgres',
    // dialectOptions: {
    //   ssl: {
    //     sslmode: 'require',
    //     rejectUnauthorized: false
    //   }
    // }
  }
);



module.exports = db;
