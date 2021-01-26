const Sequelize = require('sequelize');
const db = require('../db');

//Sample Model  Read More At https://sequelize.org/master/manual/model-basics.html

const Player = db.define('player', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  jerseyNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});



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


// Model of Student

const Student = db.define('Student',  {
  Id : {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name : {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Model of Course

const Course = db.define('Course', {
  Id : {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  }

});



module.exports = {
  Player, 
  Teacher,
  Student,
  Course
};