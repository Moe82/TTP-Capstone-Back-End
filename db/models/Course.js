const Sequelize = require('sequelize');
const db = require('../db');

// Model of Course

const Course = db.define('Course', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  module.exports = Course;