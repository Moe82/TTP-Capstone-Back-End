const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const axios = require('axios')
const dotenv = require('dotenv').config()
const models = require('../db/models')

// importing the Levenshtein algo to calculate the Levenshtein distance between names in table and names from API 
const levenshtein = require('./levenshtein');

findMatches = async (students, courseNumber) => {
  var arr = []
  let studentsTable = await models.Student.findAll({where: {CourseId:courseNumber}}); 
  students.forEach(student =>{
    studentsTable.forEach(entry =>{
      if (levenshtein(student.toLowerCase(), entry.dataValues.name.toLowerCase()) <= 3) {
        arr.push(entry.dataValues.name)
      }
    })
  })
  return arr
}

router.post('/', async (request, response, nextMiddleware) => {  
  const imgToBase64 = request.body.imgToBase64  
  try {
    const base64ToText = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`,{
      "requests": [
        {
          "image": {
            "content": imgToBase64
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    })
    const data = base64ToText.data.responses[0].textAnnotations[0].description
   
    const students = data.split("\n")
  
    const courseNumber = request.body.id
  
    const matches = await findMatches(students, courseNumber)
  
    await models.Attendance.create({
      studentsPresent: matches,
      CourseId:courseNumber
    })
  } catch(error) {
    console.log(error)
  }
})

router.get('/', async (req, res, next)=>{
  try {
    await models.Attendance.findAll({
      where: {
        CourseId: req.body.courseId
      }
    })
    .then(
      async attendanceSheet => {
        let allStudents = await models.Student.findAll({
          where: {
            CourseId: req.body.courseId
          }
        }).then()
        let attendance = {}
        for (entry in attendance){
          console.log(entry)
          console.log("___________________")
        }
      }
      ).catch(err => res.json(response))
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;