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
  { Id: 234, name: 'jeremy becker' },
  { Id: 345, name: 'Franko' },
  { Id: 786, name: 'Alseny' },
];

const seedCourse = [
  { Id: 2345, name: 'Math' },
  { Id: 7899, name: 'Machine learning' },
  { Id: 08634, name: 'Anthropology' },
];

const seed = async () => {
  Player.bulkCreate(seedPlayers);
  Teacher.bulkCreate(seedTeacher);
  Student.bulkCreate(seedStudent);
  Course.bulkCreate(seedCourse);
};
//seed().then(() => process.exit());

module.exports = seed;