const db = require('./db');
const {Player, Teacher, Student,Course} = require('./db/models');

const seedPlayers = [
  { firstName: 'Bilbo', lastName: 'Baggins', jerseyNumber: 11 },
  { firstName: 'Harry', lastName: 'Potter', jerseyNumber: 22 },
  { firstName: 'Lucifer', lastName: 'Morningstart', jerseyNumber: 666 },
];

const seedTeacher = [
  { name: 'Jeff', email: 'jeff@gmail.com', Password:11111 },
  { name: 'Cogan', email: 'cogan@gmail.com', Password:22222 },
  { name: 'Raphael', email: 'raphael@gmail.com', Password:33333 },
];

const seedStudent = [
  { name: 'jeremy becker' },
  { name: 'Franko' },
  { name: 'Alseny' },
];

const seedCourse = [
  { name: 'Math' },
  { name: 'Machine learning' },
  { name: 'Anthropology' },
];

const seed = async () => {
  Player.bulkCreate(seedPlayers);
  Teacher.bulkCreate(seedTeacher);
  Student.bulkCreate(seedStudent);
  Course.bulkCreate(seedCourse);
};
//seed().then(() => process.exit());

module.exports = seed;