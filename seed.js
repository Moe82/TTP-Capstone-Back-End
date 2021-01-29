const db = require('./db');
const {Player, Teacher, Student,Course} = require('./db/models');


const seedTeacher = [
  { name: 'Jeff', email: 'jeff@gmail.com', Password:11111 },
  { name: 'Cogan', email: 'cogan@gmail.com', Password:22222 },
  { name: 'Raphael', email: 'raphael@gmail.com', Password:33333 },
];

const seedStudent = [
  { name: 'jeremy becker' },
  { name: 'Franko' },
  { name: 'Alseny' },
  { name: 'bouba sow' },
  { name: 'alpha jallo' },
  { name: 'MOHAMMED SHAFEE' }
];

const seedCourse = [
  { name: 'Math' },
  { name: 'Machine learning' },
  { name: 'Anthropology' },
];

const seed = async () => {
  Teacher.bulkCreate(seedTeacher);
  Student.bulkCreate(seedStudent);
  Course.bulkCreate(seedCourse);
};
//seed().then(() => process.exit());

module.exports = seed;