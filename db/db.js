const Sequelize = require('sequelize');
const { name } = require('../package.json');
require('dotenv').config()

const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      sslmode: 'require',
      rejectUnauthorized: false
    }
  }
})

module.exports = database;
