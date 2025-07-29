// db.js
const Sequelize = require('sequelize');
const { name } = require('../package.json');
require('dotenv').config();

const isProd = !!process.env.DATABASE_URL;

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://postgres:${process.env.DB_PASS}@localhost:5432/${name}`,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: isProd ? { ssl: { require: true, rejectUnauthorized: false } } : {}
  }
);

module.exports = db;