const  Teacher= require('./Teacher');
const Course = require('./Course');
const Student = require('./Student');
const Attendance = require('./Attendance')

//ASSOICATIONS GO HERE -- Read more at https://sequelize.org/master/manual/assocs.html

Teacher.hasMany(Course);
Course.belongsTo(Teacher);
Course.hasMany(Student);
Student.belongsTo(Course);
Course.hasOne(Attendance);

module.exports = {
  Teacher,
  Student,
  Course,
  Attendance
};
