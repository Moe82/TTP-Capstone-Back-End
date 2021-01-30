const Sequelize = require('sequelize');
const db = require('../db');

//Sample Model  Read More At https://sequelize.org/master/manual/model-basics.html

const Attendance = db.define('attendance', {
  studentsPresent: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: true,
  }
});
 
module.exports = Attendance;