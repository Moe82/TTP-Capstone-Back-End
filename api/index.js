const router = require('express').Router();
module.exports = router;

// Mounts players api calls from api file on /api/players
router.use('/students/attendance', require('./attendance_controller'));

//Anythingn not found gets a 404
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;