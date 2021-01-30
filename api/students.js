const express = require('express');
const router = express.Router();

const { Student } = require('../db/models');


// Routes for student

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Student.findAll({
      where: {
        CourseId: req.params.id
      }
    })

      .then(
        response => res.json(response)
      )

  } catch (error) {
    console.log(error)
  }
});


// route to create a student

router.post('/',  (req, res, next) => {
  const arr = req.body.formValues.name.split(",");
  let data;
  if (arr.length > 1) {
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i])
      data =  Student.create({
        name: arr[i],
        CourseId: parseInt(req.body.courseId)
      })
    }
  } else {
    data =  Student.create({
      name: req.body.formValues.name,
      CourseId: parseInt(req.body.courseId)
    })
  }
  data 
    .then(student => res.status(200).json(student))
    .catch(error => {
      console.log("There is an error" + error);
      res.status(500).send('Hey there is an Error' + error)
    })

})



module.exports = router;