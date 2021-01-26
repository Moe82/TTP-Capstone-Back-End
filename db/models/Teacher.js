const Sequelize = require('sequelize');
const db = require('../db');

// Model of Teacher

const Teacher = db.define('Teacher', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Password: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
});

module.exports = Teacher