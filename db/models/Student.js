const Sequelize = require('sequelize');
const db = require('../db');

// Model of Student

const Student = db.define('Student',  {
    name : {
      type: Sequelize.STRING,
      allowNull: false
    }
  });


  module.exports = Student