const router = require('express').Router();


// Mounts players api calls from api file on /api/players
router.use('/players', require('./players'));
router.use('/students', require('./students'));
router.use('/courses', require('./Courses'));
router.use('/teachers', require('./teachers'));
router.use('/students/attendance', require('./attendance_controller'));

//Anythingn not found gets a 404
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

//Export our api so we can use it on our server index file(main exit point for server)
module.exports = router;