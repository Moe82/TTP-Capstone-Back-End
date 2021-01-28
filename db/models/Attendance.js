const Sequelize = require('sequelize');
const db = require('../db');

// Model of Course

const Attendance = db.define('Attendance', {
    studentPresents: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    }
  
  });

  module.exports = Attendance;