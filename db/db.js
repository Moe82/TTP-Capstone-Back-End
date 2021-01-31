
const Sequelize = require('sequelize');
const { name } = require('../package.json');
require('dotenv').config()
// Initialize database with Sequelize

console.log(process.env.DB_PASS)
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://postgres:${process.env.DB_PASS}@localhost:5432/${name}`,
  {
    logging: false,
  }
);



module.exports = db;